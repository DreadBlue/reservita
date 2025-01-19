const {
  getAvailability,
  makeReservation,
  // lookBooking 
} = require('./booking');
const { sendEmail,
  // sendCalendar
} = require('./google.js');
// const { generateHash, paymentReceiver } = require('./payments.js');
const {
  // facturaFinal, 
  // facturaManual,
  firestoreTesting
} = require('./dreadblue.js');
// const { deleteBooking, createDatabase, adminBookings, createRequest, fetchRequests, manageChangeRequest } = require('./admin.js');
const { createDatabase } = require('./admin.js');

module.exports = {
  getAvailability,
  sendEmail,
  // generateHash,
  // sendCalendar,
  // paymentReceiver,
  makeReservation,
  // facturaFinal,
  // facturaManual,
  // deleteBooking,
  createDatabase,
  // adminBookings,
  // createRequest,
  // lookBooking,
  // fetchRequests,
  // manageChangeRequest,
  firestoreTesting,
};
