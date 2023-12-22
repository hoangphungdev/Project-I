import { fb_db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where }
    from "firebase/firestore";

export const checkIfAccountExists = async (email) => {
    const q = query(collection(fb_db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
}

export const createNewAccount = async (props) => {
    try {
        const docRef = await addDoc(collection(fb_db, "users"), {
            email: props.email,
            password: props.password,
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const checkAccount = async (props) => {
    const q = query(collection(fb_db, "users"),
        where("email", "==", props.email),
        where("password", "==", props.password));
    const querySnapshot = await getDocs(q);
    let userId = null;
    querySnapshot.forEach((doc) => {
        userId = doc.id;
    });
    return userId;
}