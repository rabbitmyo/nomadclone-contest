import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsaxOyodqLzDFyerytCpoPwQnV-fr3eak",
  authDomain: "react-twt-a6a6f.firebaseapp.com",
  projectId: "react-twt-a6a6f",
  storageBucket: "react-twt-a6a6f.appspot.com",
  messagingSenderId: "208294431387",
  appId: "1:208294431387:web:096edac2c80e5a5207d43e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);