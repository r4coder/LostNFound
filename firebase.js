import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvEXGAJ_LASRCl5t1WOgvRrpY2giisULw",
  authDomain: "lostnfound-81fc8.firebaseapp.com",
  projectId: "lostnfound-81fc8",
  storageBucket: "lostnfound-81fc8.firebasestorage.app",
  messagingSenderId: "20340025913",
  appId: "1:20340025913:web:28bfa4762b2d864162fbe8",
  measurementId: "G-35NYJLM1HY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
