// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsWPlfpqB4Vv9zVi2l9dO-CwwD8qjG394",
  authDomain: "travel-companion-app-b7a8f.firebaseapp.com",
  projectId: "travel-companion-app-b7a8f",
  storageBucket: "travel-companion-app-b7a8f.firebasestorage.app",
  messagingSenderId: "178374488850",
  appId: "1:178374488850:web:0596d09b19b49cba04f9cb",
  measurementId: "G-NZTSX2G8RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);