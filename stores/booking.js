import { defineStore } from "pinia";
import {
  getDocs,
  collection,
  where,
  query,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { db } from "/firebase/firebase.config.js";
import { httpsCallable } from "firebase/functions";
import { functions } from "/firebase/firebase.config.js";

export const useBookingStore = defineStore("booking", {
  state: () => {
    return {
      date: "",
      id: "",
      products: {},
      discount: 0,
      productsPrice: 0,
      addons: {},
      addonsPrice: 0,
      bookingPrice: 0,
      morning: false,
      afternoon: false,
      transporte: false,
      almueroLocal: false,
      almuerzoSaludable: false,
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
      try {
        const createDatabaseFunction = httpsCallable(
          functions,
          'createDatabase',
        );
        await createDatabaseFunction();
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    async getAvailability(date) {
      try {
        const availabilityFunction = httpsCallable(
          functions,
          'getAvailability',
        );
        const availability = await availabilityFunction({ date });
        return availability.data;
      } catch (e) {
        return console.log('error obteniendo disponibilidad', e);
      }
    },

    applyDiscount(code) {
      const descuentos = {
        MAGIARESERVITA: 15,
        INICIACIONRESERVITA: 10,
        AVENTURAMEDELLIN: 20,
        test: 99,
      };

      if (Object.hasOwn(descuentos, code)) {
        const totalDiscount = (this.bookingPrice * descuentos[code]) / 100;
        this.updateDetails({
          discount: totalDiscount,
        });
        return "Descuento del " + descuentos[code] + "% aplicado";
      } else {
        return "Código de descuento no válido";
      }
    },

    async verifyAvailability(activity, date, time) {
      const availabilityCollection = query(
        collection(db, "activity_availability"),
        where("date", "==", date),
        where("schedule", "==", time),
        where("act_id", "==", activity)
      );

      try {
        const availabilitySnapshot = await getDocs(availabilityCollection);
        return availabilitySnapshot.docs.length > 0;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async takeAvailability() {
      const availabilityDay = doc(db, "activity_availability", `${this.id}`);

      try {
        await updateDoc(availabilityDay, {
          spots: increment(-this.quantity),
        });
      } catch (error) {
        console.error(error);
      }
    },

    async fetchEmail() {
      const item = JSON.parse(localStorage.getItem("item"));

      try {
        const infoEmail = {
          name: item.name,
          email: item.email,
          activity: item.activity,
          horario: item.horario,
          quantity: item.quantity,
          date: item.date,
          subject: "Confirmación de reserva",
          bookingCode: item.bookingId,
          almuerzo: item.almuerzo,
          transporte: item.transporte,
        };

        const functions = getFunctions();
        const sendEmail = httpsCallable(functions, "sendEmail");
        await sendEmail({ infoEmail, secret: "SendThisEmail" });
      } catch (error) {
        console.log("error fetching email: ", error);
        throw error;
      }
    },

    async makeReservation(item) {
      const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      let bookingInfo = {};
      const bookingPrice = this.productsPrice + this.addonsPrice;
      if (item.invoice.name) {
        const base64File = await fileToBase64(item.invoice);
        bookingInfo = {
          ...item,
          fileName: item.invoice.name,
          fileType: item.invoice.type,
          fileData: base64File,
          date: this.date,
          products: this.products,
          discount: this.discount,
          productsPrice: this.productsPrice,
          addons: this.addons,
          addonsPrice: this.addonsPrice,
          finalPrice: bookingPrice,
        };
      } else {
        bookingInfo = {
          ...item,
          date: this.date,
          products: this.products,
          discount: this.discount,
          productsPrice: this.productsPrice,
          addons: this.addons,
          addonsPrice: this.addonsPrice,
          bookingPrice: bookingPrice,
        }
      }

      try {
        const makeReservation = httpsCallable(functions, "makeReservation");
        const reservation = await makeReservation({ bookingInfo });
        this.bookingId = reservation.data;
        return reservation.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
