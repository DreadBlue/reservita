import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getFunctions } from 'firebase/functions';
import { getAuth } from "firebase/auth";

const apyKey = import.meta.env.VITE_APY_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;
const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: apyKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);
export const db = getFirestore();
export const auth = getAuth(app);

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6Le7mVoqAAAAAKoRUSkv7Yc4KnconJJsP2HcmZqJ'),
  isTokenAutoRefreshEnabled: true,
});