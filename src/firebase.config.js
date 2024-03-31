// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiX4XpekW8QRcSVINWPup3gu4F_-O7yNo",
  authDomain: "user-email-password-auth-aecb6.firebaseapp.com",
  projectId: "user-email-password-auth-aecb6",
  storageBucket: "user-email-password-auth-aecb6.appspot.com",
  messagingSenderId: "11296973616",
  appId: "1:11296973616:web:e10a92e78de6d1bf595ef5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
