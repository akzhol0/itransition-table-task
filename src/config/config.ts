import { initializeApp } from "firebase/app";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfO3w5hcSgqjwYoyANPMBwFU6duS3qmlY",
  authDomain: "task4-b7e55.firebaseapp.com",
  projectId: "task4-b7e55",
  storageBucket: "task4-b7e55.firebasestorage.app",
  messagingSenderId: "170349664143",
  appId: "1:170349664143:web:be1904ee8b7468db709dfa",
  measurementId: "G-C89VV07C7Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
