const { onSchedule } = require("firebase-functions/v2/scheduler");
const { db } = require("./firebase");
const { onCall } = require("firebase-functions/v2/https");
const { sendBillEmail } = require("./google");
const dayjs = require('dayjs');

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (01-12)
    const day = String(date.getDate()).padStart(2, '0'); // Día (01-31)

    return `${year}-${month}-${day}`;
};

const facturaFinal = onSchedule("59 23 28-31 * *", async () => {
    const currentDate = new Date();

    const firstDayOfMonth = new Date(currentDate);
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const lastDayOfMonth = new Date(firstDayOfMonth);
    lastDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    lastDayOfMonth.setHours(23, 59, 59, 999);

    const formattedFirstDay = formatDate(firstDayOfMonth);
    const formattedLastDay = formatDate(lastDayOfMonth);
    const reservasCollection = db.collection("reservas");

    const reservasSnapshot = await reservasCollection.where("Check in", ">=", formattedFirstDay).where('Check in', '<=', formattedLastDay).get();
    const docs = reservasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    let totalVentas = 0;

    for (const reserva of docs) {
        totalVentas += reserva.Valor;
    }
    const factura = totalVentas * 0.03;
    const totalVentasFormatted = totalVentas.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    const facturaFormatted = factura.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    const months = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
    ];

    const monthName = months[currentDate.getMonth()];
    const secretEmail = process.env.SECRET_EMAIL;


    const infoEmail = {
        billValue: facturaFormatted,
        comision: '3%',
        ventasTotales: totalVentasFormatted,
        numeroDeReservas: docs.length,
        aliado: 'Abya Yala Hostel',
        mes: monthName,
        secret: secretEmail,
    };

    return sendBillEmail(infoEmail);
});

const facturaManual = onCall(async () => {
    const currentDate = new Date(2024, 11, 1); // 11 = diciembre (meses en JavaScript son 0-indexados)

    const firstDayOfMonth = new Date(currentDate);
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const lastDayOfMonth = new Date(firstDayOfMonth);
    lastDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
    lastDayOfMonth.setDate(0);
    lastDayOfMonth.setHours(23, 59, 59, 999);

    const formattedFirstDay = formatDate(firstDayOfMonth);
    const formattedLastDay = formatDate(lastDayOfMonth);
    const reservasCollection = db.collection("reservas");

    const reservasSnapshot = await reservasCollection.where("Check in", ">=", formattedFirstDay).where('Check in', '<=', formattedLastDay).get();
    const docs = reservasSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    let totalVentas = 0;

    for (const reserva of docs) {
        totalVentas += reserva.Valor;
    }
    const factura = totalVentas * 0.03;
    const totalVentasFormatted = totalVentas.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    const facturaFormatted = factura.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    const months = [
        "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
        "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
    ];

    const monthName = months[currentDate.getMonth()];
    const secretEmail = process.env.SECRET_EMAIL;

    const infoEmail = {
        billValue: facturaFormatted,
        comision: '3%',
        ventasTotales: totalVentasFormatted,
        numeroDeReservas: docs.length,
        aliado: 'Abya Yala Hostel',
        mes: monthName,
        secret: secretEmail,
    };

    return sendBillEmail(infoEmail);
});

const firestoreTesting = onCall(async () => {
    const checkin = dayjs().format('YYYY-MM-DD');
    await db.collection('bookings').doc('RES000').set({
        name: 'Cristian',
        phone: '30080',
        email: 'cprada33@hotmail.com',
        documentId: '324234',
        participants: { hola: 'ds' },
        invoice: {},
        fileName: 'reserva',
        fileType: 'jpg',
        fileData: 'dsadadasdasd',
        productsPrice: 300000,
        discount: 0,
        products: {
            1: {
                act_id: 'arborismo',
                date: checkin,
                schedule: "9 am - 1 pm",
                spots: 20,
            }
        },
        addons: {
            1: {
                act_id: 'arborismo',
                date: checkin,
                schedule: "9 am - 1 pm",
                spots: 20,
            }
        },
        addonsPrice: 200000,
        precioFinal: 500000,
        bookingId: 'RES000',
        status: "pending",
        createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        billPath: 'comprobantes/RES000',

    });
    await db.collection('availability').doc(`arborismo_${checkin}_morning`).set({
        act_id: 'Arborismo',
        date: checkin,
        schedule: "9 am - 1 pm",
        spots: 20,
    });
    await db.collection('availability').doc(`canyoning${checkin}_morning`).set({
        act_id: 'Canyoning',
        date: checkin,
        schedule: "9 am - 1 pm",
        spots: 20,
    });
    await db.collection('availability').doc(`aventura${checkin}_morning`).set({
        act_id: 'Aventura',
        date: checkin,
        schedule: "9 am - 1 pm",
        spots: 20,
    });
    await db.collection('availability').doc(`arborismo_${checkin}_afternoon`).set({
        act_id: 'Arborismo',
        date: checkin,
        schedule: "9 am - 1 pm",
        spots: 20,
    });
    await db.collection('availability').doc(`canyoning${checkin}_afternoon`).set({
        act_id: 'Canyoning',
        date: checkin,
        schedule: "9 am - 1 pm",
        spots: 20,
    });
    await db.collection('availability').doc(`aventura${checkin}_afternoon`).set({
        act_id: 'Aventura',
        date: checkin,
        schedule: "9 am - 1 pm",
        spots: 20,
    });
    await db.collection('requests').doc('RES000').set({
        newBooking: {
            name: 'Felipe',
            phone: '30080',
            email: 'cprada33@hotmail.com',
            documentId: '324234',
            participants: { hola: 'ds' },
            invoice: {},
            fileName: 'reserva',
            fileType: 'jpg',
            fileData: 'dsadadasdasd',
            productsPrice: 300000,
            discount: 0,
            products: {
                1: {
                    act_id: 'Arborismo',
                    date: checkin,
                    schedule: "9 am - 1 pm",
                    spots: 20,
                }
            },
            addons: 'dsa',
            addonsPrice: 200000,
            precioFinal: 500000,
            bookingId: 'RES000',
            status: "pending",
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            billPath: 'comprobantes/RES000',

        },
        id: 'RES000',
        nombre: 'Cristian',
        status: 'pending',
        tipo: 'Nombre',
        solicitud: {
            1: {
                solicitud: 'Cambiar nombre de Cristian a Felipe',
            },
        },
        // import { useBookingStore } from '@/stores/booking';
        // const useBooking = useBookingStore();
        // onMounted(async () => {
        //   await useBooking.firestoreTesting();
        // });
    });
});

module.exports = { facturaFinal, facturaManual, firestoreTesting };
