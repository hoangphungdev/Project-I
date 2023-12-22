import { fb_db } from '../../firebaseConfig'
import {
    collection, doc, getDoc, getDocs, addDoc,
    updateDoc, deleteDoc, query, where, arrayUnion, arrayRemove
} from "firebase/firestore";


export const createNewTaskList = async (user_id) => {
    try {
        await addDoc(collection(fb_db, "TaskList"), {
            user_id: user_id,
            task_ids: [],
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const addTaskIdToTaskList = async (props) => {
    const q = query(collection(fb_db, "TaskList"), where("user_id", "==", props.user_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
            task_ids: arrayUnion(props.task_id),
        });
    });
}

export const removeTaskIdFromTaskList = async (props) => {
    const q = query(collection(fb_db, "TaskList"), where("user_id", "==", props.user_id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        updateDoc(doc.ref, {
            task_ids: arrayRemove(props.task_id),
        });
    });
}
export const getTaskListsByUserId = async (user_id) => {
    const q = query(collection(fb_db, "TaskList"), where("user_id", "==", user_id));
    const querySnapshot = await getDocs(q);
    let task_ids = [];
    querySnapshot.forEach((doc) => {
        task_ids = doc.data().task_ids;
    });
    return task_ids;
}