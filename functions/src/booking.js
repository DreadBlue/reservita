const {
    log,
    // info,
    // debug,
    // warn,
    // error,
    // write,
} = require('firebase-functions/logger');
const { onCall } = require('firebase-functions/v2/https');
const { FieldValue } = require('firebase-admin/firestore');
// const { formValidations } = require('./middlewares.js');
const { sendBookEmail,
    // addCalendar 
} = require('./google.js');
const dayjs = require('dayjs');
const { db, bucket } = require('./firebase');

const getAvailability = onCall(async (request) => {
    const data = request.data;
    const availabilityCollection = db.collection('availability');
    const disponibilidad = {
        Arborismo: 0,
        Canyoning: 0,
        Aventura: 0,
    };

    const availabilityQuery = availabilityCollection.where("date", "==", data.date)

    try {
        const availabilitySnapshot = await availabilityQuery.get();
        const docs = availabilitySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        disponibilidad.Arborismo = { morning: docs[0], afternoon: docs[1] };
        disponibilidad.Aventura = { morning: docs[2], afternoon: docs[3] };
        disponibilidad.Canyoning = { morning: docs[4], afternoon: docs[5] };

        return disponibilidad;
    } catch (error) {
        console.error(error);
        return error;
    }
});

const generateBookingCode = async () => {
    const caracteres = "RESRVITA0123456789";
    let codigo = "";

    for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
    }
    return codigo;
};

const verifyAvailability = async (item) => {
    for (const data in item.products) {
        const availabilityDay = db.collection('availability')
            .where('date', '==', item.products[data].date)
            .where('schedule', '==', item.products[data].schedule)
            .where('act_id', '==', item.products[data].act_id);

        try {
            const availabilitySnapshot = await availabilityDay.get();
            const docs = availabilitySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const doc = docs[0];

            if (doc.spots < item.products[data].quantity) {
                return 'no hay disponibilidad'
            }
            return true
        } catch (error) {
            log(error);
            return false;
        }
    }
};

const takeAvailability = async (item) => {
    for (const data in item.products) {
        const availabilityCollection = db.collection('availability');
        const availabilityDay = availabilityCollection
            .where('date', '==', item.products[data].date)
            .where('schedule', '==', item.products[data].schedule)
            .where('act_id', '==', item.products[data].act_id);

        try {
            const availabilitySnapshot = await availabilityDay.get();
            const docs = availabilitySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const doc = docs[0];

            await availabilityCollection.doc(doc.id).update({
                spots: FieldValue.increment(-item.products[data].quantity),
            })

        } catch (error) {
            console.error(error);
        }
    }
};


const makeReservation = onCall(async (request) => {
    const item = request.data.bookingInfo;
    // const inputsVerification = await formValidations(item);
    // const inputsVerification = true;
    // if (inputsVerification == false) {
    //     return 'Error en los datos ingresados';
    // }
    const bookingId = await generateBookingCode();
    const availabilityVerification = await verifyAvailability(item);
    if (availabilityVerification == false) {
        return 'No hay disponibilidad';
    }
    const bookingsCollection = db.collection('bookings');

    try {
        if (item.fileData) {
            const buffer = Buffer.from(item.fileData, 'base64');
            const file = bucket.file(`comprobantes/${bookingId}`);
            await file.save(buffer, {
                contentType: item.fileType,
                public: false,
            });
        }
        const url = `comprobantes/${bookingId}`;
        log('Comprobante subido con éxito');

        await bookingsCollection.doc(bookingId).set({
            ...item,
            bookingId: bookingId,
            status: "pending",
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            billPath: url,
        });
        log('Reserva creada con éxito');
        await takeAvailability(item);
        log('Disponibilidad actualizada');
        const secretEmail = process.env.SECRET_EMAIL;
        let activitiesEmail = '';
        let quantityEmail = 0;
        let menuEmail = 0;
        let transportEmail = 0;
        for (const addon in item.addons) {
            if (addon == 'Almuerzo saludable') {
                menuEmail = menuEmail + item.addons[addon].amount;
            } else if (addon == 'Almuerzo local') {
                menuEmail = menuEmail + item.addons[addon].amount;
            } else if (addon == 'Transporte') {
                transportEmail = item.addons[addon].amount;
            }
        }
        for (const activity in item.products) {
            quantityEmail = quantityEmail + item.products[activity].quantity;
            if (activitiesEmail === '') {
                activitiesEmail = item.products[activity].act_id + ' a las ' + item.products[activity].schedule;
            } else {
                activitiesEmail = activitiesEmail + ', ' + item.products[activity].act_id + ' a las ' + item.products[activity].schedule;
            }
        }
        const infoEmail = {
            bookingId: bookingId,
            name: item.name,
            activities: activitiesEmail,
            date: item.date,
            quantity: quantityEmail,
            menu: menuEmail,
            transport: transportEmail,
            subject: 'Confirmación de reserva',
            secret: secretEmail,
            email: item.email,
        };
        sendBookEmail(infoEmail);
        // const secretCalendar = process.env.SECRET_CALENDAR;
        // const description = `https://www.lareservita.com/admin/reservas/${item.bookingId}-${item.mail}`;
        // const infoEvent = {
        //     date: item.date,
        //     activity: item.activity,
        //     name: item.name,
        //     schedule: item.schedule,
        //     description,
        //     bookingId: bookingId,
        //     secret: secretCalendar,
        // };
        // addCalendar(infoEvent);
        return bookingId;
    } catch (error) {
        console.error('Error fetching reserva: ', error);
    }
});

const lookBooking = onCall(async (request) => {
    const { id, email } = request.data.bookingInfo;
    const bookingQuery = db.collection('bookings').where('bookingId', '==', id).where('email', '==', email);


    try {
        const availabilitySnapshot = await bookingQuery.get();
        const docs = availabilitySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        log(docs);
        return docs[0];
    } catch (e) {
        log('Wrong information', e);
    }
});

module.exports = {
    getAvailability,
    makeReservation,
    lookBooking,
};
