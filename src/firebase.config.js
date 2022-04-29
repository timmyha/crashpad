import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlK4hY66-Ej2PD8ZsWmNzkIQlG5LOUszE",
  authDomain: "basement-finder-f2fbc.firebaseapp.com",
  projectId: "basement-finder-f2fbc",
  storageBucket: "basement-finder-f2fbc.appspot.com",
  messagingSenderId: "695252371228",
  appId: "1:695252371228:web:f23af510a22be081651cd9",
  measurementId: "G-E4996D28KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth(app);