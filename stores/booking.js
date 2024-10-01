import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
} from 'firebase/firestore';
import { db } from '/firebase/firebase.config.js';
import { getFunctions, httpsCallable } from 'firebase/functions';

export const useBookingStore = defineStore('booking', {
  state: () => {
    return {
      nombre: '',
      celular: '',
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
  },
});
