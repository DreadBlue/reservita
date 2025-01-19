import { defineStore } from 'pinia';
import {
  getDocs,
  collection,
  where,
  query,
  startAfter,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "/firebase/firebase.config.js";
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

    async adminBookings(filters) {
      if (activities.length > 0 && horarios.length > 0 && comida.length > 0 && transporte.length > 0) {
        try {
          const functions = filters;
          return functions;
        } catch (error) {
          console.log("error fetching booking: ", error);
          throw error;
        }
      } else {
        return ['Faltan filtros']
      }
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
        const reservaDB = query(
          collection(db, "reservas"),
          orderBy("Check in", "desc"),
          startAfter(this.lastBooking),
          limit(10)
        );
        let snapshot = await getDocs(reservaDB);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.lastBooking = docs[docs.length - 1]["Check in"];

        return docs;
      } catch (error) {
        console.log("Más reservas error: ", error);
      }
    },
  },
});
