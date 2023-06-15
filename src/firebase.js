import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUJCEYKs_9pCIg-YRwTmQBCHXMdTpAQDQ",
  authDomain: "social-media-81040.firebaseapp.com",
  projectId: "social-media-81040",
  storageBucket: "social-media-81040.appspot.com",
  messagingSenderId: "1040920064414",
  appId: "1:1040920064414:web:c488868914b0c98ce5268f",
  measurementId: "G-44SVN3LB07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, auth, db};