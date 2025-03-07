import { defineStore } from 'pinia';
import {
  getDocs,
  collection,
  where,
  query
} from "firebase/firestore";
import { db } from "/firebase/firebase.config.js";
import { httpsCallable } from "firebase/functions";
import { functions } from "/firebase/firebase.config.js";
// import { validatePassword } from 'firebase/auth';

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      showPreview: false,
      signOutButton: false,
    };
  },
  actions: {
    updateDetails(item) {
      const statesNames = Object.keys(this.$state);
      for (const data in item) {
        if (statesNames.includes(data)) {
          this.$state[data] = item[data];
        }
      }
    },

    async adminBookings() {
      // if (activities.length > 0 && horarios.length > 0 && comida.length > 0 && transporte.length > 0) {
      try {
        const adminBookings = httpsCallable(
          functions,
          'adminBookings',
        );
        const bookings = await adminBookings();
        this.lastBooking = bookings.data[bookings.data.length - 1].date;
        return bookings.data
      } catch (error) {
        console.log("error fetching booking: ", error);
        throw error;
      }
      // } 
      // else {
      //   return ['Faltan filtros']
      // }
    },

    async lookBooking(booking) {
      try {
        const reservaDB = query(
          collection(db, "reservas"),
          where("bookingId", "==", booking[0]),
          where("Correo", "==", booking[1])
        );
        let snapshot = await getDocs(reservaDB);
        if (snapshot.docs.length == 0) {
          return "wrong information";
        } else if (!snapshot.docs.length == 0) {
          const docs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return docs;
        }
      } catch (error) {
        console.log("error fetching booking: ", error);
        throw error;
      }
    },


    async cargarReservas() {
      try {
        const extraBookings = httpsCallable(
          functions,
          'extraBookings',
        );
        const bookings = await extraBookings(this.lastBooking);
        this.lastBooking = bookings.data[bookings.data.length - 1].date;
        return bookings.data
      } catch (error) {
        console.log("error fetching booking: ", error);
        throw error;
      }
    },
  },
});
