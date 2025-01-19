const { getAvailability, makeReservation, lookBooking } = require('./booking');
const { sendEmail,
  // sendCalendar
} = require('./google.js');
<<<<<<< HEAD
// const { paymentReceiver } = require('./payments.js');
=======
// const { generateHash, paymentReceiver } = require('./payments.js');
>>>>>>> f2ae2d0 (Booking process finished)
const { manualBill, monthlyBill, firestoreTesting } = require('./dreadblue.js');
// const { deleteBooking, createDatabase, adminBookings, createRequest, fetchRequests, manageChangeRequest } = require('./admin.js');
const { createDatabase, adminBookings, deleteBooking } = require('./admin.js');

module.exports = {
  getAvailability,
  sendEmail,
  // sendCalendar,
  // paymentReceiver,
  makeReservation,
  monthlyBill,
  manualBill,
<<<<<<< HEAD
  deleteBooking,
=======
  // deleteBooking,
>>>>>>> f2ae2d0 (Booking process finished)
  createDatabase,
  adminBookings,
  // createRequest,
  lookBooking,
  // fetchRequests,
  // manageChangeRequest,
  firestoreTesting,
};
