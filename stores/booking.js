import { defineStore } from "pinia";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
// import { getFunctions, httpsCallable } from "firebase/functions";

export const useBookingStore = defineStore("booking", {
  state: () => {
    return {
      activity: '',
      date: '',
      quantity: 0,
      id: '',
      horario: '',
      bookingPrice: 0,
      discount: 0,
      addonsPrice: 0,
      disponibilidad: {
        arborismo: 0,
        cayoning: 0,
        aventura: 0
      },
      max: '2025-04-30',
      arborimosAfternoon: {},
      arborimosMorning: {},
      aventuraAfternoon: {},
      aventuraMorning: {},
      canyoningAfternoon: {},
      canyoningMorning: {}
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
      const start = new Date("2024-10-15");
      const end = new Date("2025-04-30");

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split("T")[0];

        await setDoc(
          doc(db, "activity_availability", `aventura_${formattedDate}_morning`),
          {
            act_id: "aventura",
            date: formattedDate,
            time_slot: "morning",
            spots: 25,
          }
        );
        await setDoc(
          doc(
            db,
            "activity_availability",
            `aventura_${formattedDate}_afternoon`
          ),
          {
            act_id: "aventura",
            date: formattedDate,
            time_slot: "afternoon",
            spots: 25,
          }
        );
      }
    },

   updatePrice(quantity, activity) {
      if (activity == 'arborismo') {
        if (quantity == 1) {
          this.bookingPrice = 100000 * quantity;
        } else if (quantity <= 5) {
          this.bookingPrice = 80000 * quantity;
        } else if (quantity <= 8) {
          this.bookingPrice = 70000 * quantity;
        } else if (quantity <= 15) {
          this.bookingPrice = 50000 * quantity;
        }
      } else if (activity == 'canyoning') {
        if (quantity == 1) {
          this.bookingPrice = 190000 * quantity;
        } else if (quantity <= 5) {
          this.bookingPrice = 170000 * quantity;
        } else if (quantity <= 8) {
          this.bookingPrice = 150000 * quantity;
        } else if (quantity <= 15) {
          this.bookingPrice = 140000 * quantity;
        } else if (quantity <= 20) {
          this.bookingPrice = 110000 * quantity;
        }
      } else if (activity == 'aventura') {
        if (quantity == 1) {
          this.bookingPrice = 230000 * quantity;
        } else if (quantity <= 12) {
          this.bookingPrice = 200000 * quantity;
        } else if (quantity <= 20) {
          this.bookingPrice = 180000 * quantity;
        }
      }
    },

    applyDiscount(code) {
      const descuentos = {
        "123456": 10,
        "123457": 20,

      };

      if (Object.hasOwn(descuentos, code)) {
        const totalDiscount = (this.bookingPrice * descuentos[code]) / 100;
        this.updateDetails({
          discount: totalDiscount,
        });
        return 'Descuento del ' + descuentos[code] + '% aplicado';
      } else {
        return 'Código de descuento no válido';
      }
    },

    async getAvailability(date) {
      const availabilityCollection = query(
        collection(db, "activity_availability"),
        where("date", "==", date)
      );

      try {
        const availabilitySnapshot = await getDocs(availabilityCollection);
        const docs = availabilitySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.arborismo = [docs[0], docs[1]];
        this.aventura = [docs[2], docs[3]];
        this.canyoning = [docs[4], docs[5]];
        return docs
      } catch (error) {
        console.error(error);
        return [];
      }
    },
  },
});
