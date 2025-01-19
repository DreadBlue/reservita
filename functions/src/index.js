const {
  getAvailability,
  makeReservation,
  // lookBooking 
} = require('./booking');
const { sendEmail,
  // sendCalendar
} = require('./google.js');
// const { generateHash, paymentReceiver } = require('./payments.js');
const { manualBill, monthlyBill, firestoreTesting } = require('./dreadblue.js');
// const { deleteBooking, createDatabase, adminBookings, createRequest, fetchRequests, manageChangeRequest } = require('./admin.js');
const { createDatabase, adminBookings } = require('./admin.js');

module.exports = {
  getAvailability,
  sendEmail,
  // generateHash,
  // sendCalendar,
  // paymentReceiver,
  makeReservation,
  monthlyBill,
  manualBill,
  // deleteBooking,
  createDatabase,
  adminBookings,
  // createRequest,
  // lookBooking,
  // fetchRequests,
  // manageChangeRequest,
  firestoreTesting,
};
