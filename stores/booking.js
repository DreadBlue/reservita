import { defineStore } from "pinia";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getDocs,
  collection,
  where,
  query,
  orderBy,
  setDoc,
  doc,
  limit,
  startAfter,
  deleteDoc,
} from "firebase/firestore";
import { db } from "/firebase/firebase.config.js";
import { getFunctions, httpsCallable } from "firebase/functions";

export const useBookingStore = defineStore("booking", {
  state: () => {
    return {
      nombre: "",
      celular: "",
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
    async createDatabase() {
      const start = new Date('2024-10-15');
      const end = new Date('2025-04-30');
      
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split("T")[0];

        await setDoc(doc(db, 'activity_availability', `aventura_${formattedDate}_morning`), {
          act_id: 'aventura',
          date: formattedDate,
          time_slot: 'morning',
          spots: 25,
        });
        await setDoc(doc(db, 'activity_availability', `aventura_${formattedDate}_afternoon`), {
          act_id: 'aventura',
          date: formattedDate,
          time_slot: 'afternoon',
          spots: 25,
        });
      }
    },
  },
});
