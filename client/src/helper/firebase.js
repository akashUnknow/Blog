// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mern-blog-87f8d.firebaseapp.com",
  projectId: "mern-blog-87f8d",
  storageBucket: "mern-blog-87f8d.firebasestorage.app",
  messagingSenderId: "221282679177",
  appId: "1:221282679177:web:b7689a932d2b6ab4be4958"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export {  auth, provider };