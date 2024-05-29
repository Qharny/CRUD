// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-vgS2CJ4oLthC_CYVR33nxesUg6QP3u0",
  authDomain: "crud-15408.firebaseapp.com",
  projectId: "crud-15408",
  storageBucket: "crud-15408.appspot.com",
  messagingSenderId: "693962555653",
  appId: "1:693962555653:web:8159d3f4dc346fcc6c776c",
  measurementId: "G-88TL5RD7RY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };