// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqEl8dA9hIezJHE_Qa6GS8VbA_9Suh7bM",
  authDomain: "diplom-8711f.firebaseapp.com",
  projectId: "diplom-8711f",
  storageBucket: "diplom-8711f.appspot.com",
  messagingSenderId: "134277376384",
  appId: "1:134277376384:web:e3318340fdde3b07343965"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);