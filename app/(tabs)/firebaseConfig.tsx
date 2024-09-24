import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXbcwgk9aJgGONhLjFfBPpPjbnbH3pHS0",
  authDomain: "apppj-b1844.firebaseapp.com",
  projectId: "apppj-b1844",
  storageBucket: "apppj-b1844.appspot.com",
  messagingSenderId: "700651700284",
  appId: "1:700651700284:web:3fd839cc85e01274700339",
  measurementId: "G-1FCV78YYQQ"
};

export const FIREBASE_APP=initializeApp(firebaseConfig);
export const FIREBASE_AUTH=getAuth(FIREBASE_APP);
export const FIRESTORE_DB=getFirestore(FIREBASE_APP);

