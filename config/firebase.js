import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBNalSKvl_c5ALN8bTwM4Mjt06XNOK9Tws",
  authDomain: "test2-bbbf7.firebaseapp.com",
  projectId: "test2-bbbf7",
  storageBucket: "test2-bbbf7.appspot.com",
  messagingSenderId: "532746953920",
  appId: "1:532746953920:web:ed3a7a14f72f581d923925",
  storageBucket: "gs://test2-bbbf7.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider(app)
