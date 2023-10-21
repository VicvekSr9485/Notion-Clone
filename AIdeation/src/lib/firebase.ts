// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "aideation-61863.firebaseapp.com",
  projectId: "aideation-61863",
  storageBucket: "aideation-61863.appspot.com",
  messagingSenderId: "655309714689",
  appId: "1:655309714689:web:c947f09a002a1ce2261700"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)