import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCE37L5CorhlfGCUShkFVT09eZOp1u8RC0",
    authDomain: "stackmastery-assaignments.firebaseapp.com",
    projectId: "stackmastery-assaignments",
    storageBucket: "stackmastery-assaignments.firebasestorage.app",
    messagingSenderId: "410600635916",
    appId: "1:410600635916:web:23db7d20f7932a91b67829",
    measurementId: "G-Q1ZHR082FE"
};

// Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
