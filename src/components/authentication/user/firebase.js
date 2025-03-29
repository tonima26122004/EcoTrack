// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import authentication module
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs264Ra8LoYHabpu6h1BwrgLynYR5IZRk",
  authDomain: "ecotrack-96a4f.firebaseapp.com",
  projectId: "ecotrack-96a4f",
  storageBucket: "ecotrack-96a4f.appspot.com",
  messagingSenderId: "430951030885",
  appId: "1:430951030885:web:a8c7cf466b36fa6642e68c",
  measurementId: "G-W2S8KTQ1D7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication

export { auth };
