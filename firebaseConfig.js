// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@react-native-firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG5ITnsVWRIw4V-3u4m28ZiPDQ5zfAKAk",
  authDomain: "receptarium-6a33c.firebaseapp.com",
  projectId: "receptarium-6a33c",
  storageBucket: "receptarium-6a33c.appspot.com",
  messagingSenderId: "736279271180",
  appId: "1:736279271180:web:8bba3106c2c402c76c9b29"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);
export const FIREBASE_AUTH = getAuth(app)