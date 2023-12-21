import { fb_db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const checkIfAccountExists = async (email) => {
    const querySnapshot = await getDocs(collection(fb_db, "users"));
    let exists = false;
    querySnapshot.forEach((doc) => {
        if (doc.data().email === email) {
            exists = true;
        }
    });
    return exists;
}

export const createNewAccount = async (props) => {
    try {
        await addDoc(collection(fb_db, "users"), {
            email: props.email,
            password: props.password,
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const checkAccount = async (props) => {
    const querySnapshot = await getDocs(collection(fb_db, "users"));
    let userId = null;
    querySnapshot.forEach((doc) => {
        if (doc.data().email === props.email && doc.data().password === props.password) {
            userId = doc.id;
        }
    });
    return userId;
}