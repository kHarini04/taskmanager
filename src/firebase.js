import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB-v4dnIBAdI6X84ZOtPlU47Y1WKaBB-jM",
  authDomain: "taskmanager-66e69.firebaseapp.com",
  projectId: "taskmanager-66e69",
  storageBucket: "taskmanager-66e69.firebasestorage.app",
  messagingSenderId: "224713867485",
  appId: "1:224713867485:web:0ee8a63b3425d1915c1b34",
  measurementId: "G-358FPXCF3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Export authentication instance
const db = getFirestore(app); // Export firestore instance

export { auth, db };  // Export auth and db instances for use
