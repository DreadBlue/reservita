import { defineStore } from "pinia";
// import {
//   getDocs,
//   collection,
//   where,
//   query,
//   startAfter,
//   orderBy,
//   limit,
// } from "firebase/firestore";
// import { db } from "/firebase/firebase.config.js";
// import { validatePassword } from 'firebase/auth';

export const useAdministrationStore = defineStore("administration", {
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

    productManagement() {
      console.log("productManagement");
    },
  },
});
