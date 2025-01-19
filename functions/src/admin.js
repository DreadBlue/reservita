const { onCall } = require('firebase-functions/v2/https');
const { log } = require('firebase-functions/logger');
const { FieldValue } = require('firebase-admin/firestore');
const { deleteCalendarEvent } = require('./google');
const { db } = require('./firebase');
const dayjs = require('dayjs');


const createDatabase = onCall(async () => {
    const availabilityCollection = db.collection('availability');
    const start = new Date("2025-01-15");
    const end = new Date("2025-12-31");
    const activities = ["Arborismo", "Aventura", "Canyoning"];

    try {
        for (
            let date = new Date(start);
            date <= end;
            date.setDate(date.getDate() + 1)
        ) {
            const formattedDate = date.toISOString().split('T')[0];

            for (const activity of activities) {
                await availabilityCollection
                    .doc(`${activity}_${formattedDate}_morning`)
                    .set({
                        act_id: activity,
                        date: formattedDate,
                        schedule: "9 am - 1 pm",
                        spots: 20,
                    });
                await availabilityCollection
                    .doc(`${activity}_${formattedDate}_afternoon`)
                    .set({
                        act_id: activity,
                        date: formattedDate,
                        schedule: "1 pm - 5 pm",
                        spots: 20,
                    });
            }
        }
        return log('base de fechas creada')
    } catch (e) {
        log('error creando base de fechas', e)
    }
    // import { useBookingStore } from '@/stores/booking';
    // const useBooking = useBookingStore();
    // onMounted(async () => {
    //   await useBooking.createDatabase();
    // });
});


const adminBookings = onCall(async (request) => {
    const filters = request.data.filters;
    // const activities = Object.entries(filters.activities).filter(([key, value]) => value === true).map(([key]) => key);
    // const horarios = Object.entries(filters.horario).filter(([key, value]) => value === true).map(([key]) => key);
    // const comida = Object.entries(filters.comida).filter(([key, value]) => value === true).map(([key]) => key);
    // const transporte = Object.entries(filters.transporte).filter(([key, value]) => value === true).map(([key]) => key);
    const reservasCollection = db.collection('bookings');

    if (activities.length > 0 && horarios.length > 0 && comida.length > 0 && transporte.length > 0) {
        try {
            const reservasQuery = reservasCollection
                .where("date", "<=", filters.time.startDate)
                .where("date", ">=", filters.time.endDate)
                .where("Tipo de cabañas", "in", filters.cabanas)
                .where("actividades", "in", filters.actividades)
                .where("comida", "in", filters.comida)
                .where("pago", "in", filters.pago)
                .orderBy("date", "desc");
            const reservasSnapshot = await reservasQuery.get();
            const docs = reservasSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return docs;
        } catch (error) {
            console.log("error trayendo las reservas: ", error);
            throw error;
        }
    } else {
        return ['Faltan filtros'];
    }
});

const retakeAvailability = async (item) => {
    const availabilityCollection = db.collection('availability');
    const availabilityQuery = availabilityCollection
        .where('date', '==', item.date)
        .where('act_id', '==', item.actividad.toLowerCase())
        .where('schedule', '==', item.slot.toLowerCase());

    try {
        const availabilitySnapshot = await availabilityQuery.get();
        const docs = availabilitySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const doc = docs[0];

        const docRef = availabilityCollection.doc(doc.id);
        await docRef.update({
            spots: FieldValue.increment(item.quantity),
        });
    } catch (error) {
        console.error('error retaking availability', error);
    }
};

const deleteBooking = onCall(async (request) => {
    const data = JSON.parse(request.data.item);
    const bookingRef = db.collection('bookings').doc(data.id);

    let date = dayjs(data.date, 'YYYY-MM-DD');

    try {
        await retakeAvailability({ data, date });
        await bookingRef.delete();
        await deleteCalendarEvent(data);
        return 'Complete booking deleted';
    } catch (error) {
        console.error(error);
        return error;
    }
});

const createRequest = onCall(async (request) => {
    const clientObject = request.data;
    const bookingQuery = db.collection('bookings').where('bookingId', '==', clientObject.id).where('email', '==', clientObject.Correo);
    const resquestCollection = db.collection('requests');

    try {
        const bookingSnapshot = await bookingQuery.get();
        const docs = bookingSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const serverObject = docs[0];
        const differences = {};
        let type = '';

        for (const key in clientObject) {
            if (clientObject[key] !== serverObject[key]) {
                differences[key] = { client: clientObject[key], server: serverObject[key] };
                if (type === '') {
                    type = key;
                } else {
                    type = 'varias';
                }
            }
        }

        const modifications = {};
        let iterarion = 1;

        for (const difference in differences) {
            if (Object.prototype.hasOwnProperty.call(differences, difference)) {
                modifications[iterarion] = { modification: `Cambiar ${difference.toLocaleLowerCase} de ${differences[difference].client} a ${differences[difference].server}` };
                iterarion++;
            }
        }
        resquestCollection.doc(clientObject.id).set({
            newBooking: clientObject,
            id: clientObject.id,
            name: clientObject.Nombre,
            type: type,
            modifications: modifications,
            status: 'pending',
        });
    } catch (error) {
        log('Error creating the request', error);
    }
});

const fetchRequests = onCall(async () => {
    const requestsQuery = db.collection('requests').where('status', '==', 'pending');
    try {
        const requestsSnapshot = await requestsQuery.get();
        const docs = requestsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return docs;
    } catch (e) {
        log('Error fetching change requests', e);
    }
});

const manageChangeRequest = onCall(async (req) => {
    log('req', req);
    // const reservasCollection = db.collection('reservas').doc(data.id).update(data.newBooking);

    return log('reserva updated');
});

module.exports = { createDatabase, deleteBooking, adminBookings, createRequest, fetchRequests, manageChangeRequest };