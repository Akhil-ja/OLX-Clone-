// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6IZRn7VozciR5E8AK5SCRbxgiAYGCjbw",
  authDomain: "olx-clone-14279.firebaseapp.com",
  projectId: "olx-clone-14279",
  storageBucket: "olx-clone-14279.appspot.com",
  messagingSenderId: "572207362447",
  appId: "1:572207362447:web:4ceb8c8f4881f3aef49bfa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app as Firebase, auth, firestore, storage };
