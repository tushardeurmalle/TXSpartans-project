// src/firebase.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration from the user
const firebaseConfig = {
  apiKey: "AIzaSyB785aeYlcvdkWT8EDYJI9Hdvr8a9H_JsI",
  authDomain: "pashunetra-2025.firebaseapp.com",
  projectId: "pashunetra-2025",
  storageBucket: "pashunetra-2025.firebasestorage.app",
  messagingSenderId: "267196255215",
  appId: "1:267196255215:web:cfdc3b5d8edac62bc9441a",
  measurementId: "G-Y0MD0KYE2M"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
