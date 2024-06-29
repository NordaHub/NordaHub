// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNb3UnJNsc7-cnQ90-yqw_jRHVSK77D0s",
  authDomain: "norr-b081d.firebaseapp.com",
  projectId: "norr-b081d",
  storageBucket: "norr-b081d.appspot.com",
  messagingSenderId: "689054084367",
  appId: "1:689054084367:web:f76025347319335f6b227a",
  measurementId: "G-MX2RKG98ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);