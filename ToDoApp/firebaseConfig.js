import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCqLGpepjT8VlFaCRhgjSOl4ksY_oXyyI",
    authDomain: "todoapp-c328f.firebaseapp.com",
    projectId: "todoapp-c328f",
    storageBucket: "todoapp-c328f.appspot.com",
    messagingSenderId: "925612766299",
    appId: "1:925612766299:web:a9e261de3fcb5e7f637b7e",
    measurementId: "G-V088SR5DJX"
};

export const fb_app = initializeApp(firebaseConfig);
export const fb_db = getFirestore(fb_app);