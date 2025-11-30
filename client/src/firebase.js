// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a4c4b.firebaseapp.com",
  projectId: "mern-estate-a4c4b",
  storageBucket: "mern-estate-a4c4b.firebasestorage.app",
  messagingSenderId: "165573728292",
  appId: "1:165573728292:web:265531a165fef88554e0b1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
