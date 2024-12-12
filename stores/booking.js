import { defineStore } from "pinia";
import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getDocs,
  collection,
  where,
  query,
  updateDoc,
  increment,
  // orderBy,
  setDoc,
  doc,
  // limit,
  // startAfter,
  // deleteDoc,
} from "firebase/firestore";
import { db } from "/firebase/firebase.config.js";
import { getFunctions, httpsCallable } from "firebase/functions";

export const useBookingStore = defineStore("booking", {
  state: () => {
    return {
      activity: "",
      date: "",
      quantity: 0,
      id: "",
      bookingId: "",
      horario: "",
      bookingPrice: 0,
      discount: 0,
      addonsPrice: 0,
      food: false,
      almuerzo: 0,
      transporte: false,
      disponibilidad: {
        arborismo: 0,
        cayoning: 0,
        aventura: 0,
      },
      max: "2025-04-30",
      arborimosAfternoon: {},
      arborimosMorning: {},
      aventuraAfternoon: {},
      aventuraMorning: {},
      canyoningAfternoon: {},
      canyoningMorning: {},
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

    async createAvailability() {
      const start = new Date("2024-10-15");
      const end = new Date("2025-04-30");
      const activities = ["arborismo", "aventura", "canyoning"];

      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        const formattedDate = date.toISOString().split("T")[0];

        for (const activity of activities) {
          await setDoc(
            doc(
              db,
              "activity_availability",
              `${activity}_${formattedDate}_morning`
            ),
            {
              act_id: activity,
              date: formattedDate,
              time_slot: "morning",
              spots: 20,
            }
          );
          await setDoc(
            doc(
              db,
              "activity_availability",
              `${activity}_${formattedDate}_afternoon`
            ),
            {
              act_id: activity,
              date: formattedDate,
              time_slot: "afternoon",
              spots: 20,
            }
          );
        }
      }
    },

    async createProducts() {
      
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
        return docs;
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    updatePrice(quantity, activity) {
      if (activity == "arborismo") {
        if (quantity == 1) {
          this.bookingPrice = 100000 * quantity;
        } else if (quantity <= 5) {
          this.bookingPrice = 80000 * quantity;
        } else if (quantity <= 8) {
          this.bookingPrice = 70000 * quantity;
        } else if (quantity <= 15) {
          this.bookingPrice = 50000 * quantity;
        }
      } else if (activity == "canyoning") {
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
      } else if (activity == "aventura") {
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
        where("time_slot", "==", time),
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

    generateBookingCode() {
      const caracteres = "RESRVITA0123456789";
      let codigo = "";

      for (let i = 0; i < 6; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indiceAleatorio];
      }
      return codigo;
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
      const bookingId = this.generateBookingCode();
      await this.takeAvailability();
      let url = "";

      if (item.invoice instanceof File) {
        const storage = getStorage();
        const archivoRef = ref(storage, `comprobantes/${bookingId}`);
        const uploadInvoice = await uploadBytes(archivoRef, item.invoice);

        url = await getDownloadURL(archivoRef);
        console.log("Archivo subido con éxito", uploadInvoice);
      }

      try {
        const transporte = this.transporte ? "inlcuido" : "noIncluido";
        const comida = this.food ? "inlcuido" : "noIncluido";
        setDoc(doc(db, "bookings", bookingId), {
          bookingId: bookingId,
          name: item.name,
          email: item.email,
          phone: item.phone,
          documentId: item.documentId,
          participants: item.participants,
          activity: this.activity,
          date: this.date,
          quantity: this.quantity,
          horario: this.horario,
          bookingPrice: this.bookingPrice,
          discount: this.discount,
          food: comida,
          addonsPrice: this.addonsPrice,
          transporte: transporte,
          almuerzo: this.almuerzo,
          status: "pending",
          createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          bill: url,
        });

        const emailItem = {
          name: item.name,
          email: item.email,
          activity: this.activity,
          horario: this.horario,
          quantity: this.quantity,
          date: this.date,
          precio: item.bookingPrice,
          bookingId: bookingId,
          almuerzo: this.almuerzo,
          transporte: this.transporte,
        };
        localStorage.setItem("item", JSON.stringify(emailItem));
        this.bookingId = bookingId;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
