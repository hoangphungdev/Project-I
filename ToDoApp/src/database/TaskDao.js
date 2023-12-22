import { fb_db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";


export const createNewTask = async (props) => {
    try {
        const docRef = await addDoc(collection(fb_db, "tasks"), {
            name: props.name,
            step: [],
            myDay: false,
            important: false,
            completed: false,
            timeReminder: null,
            dueDate: null,
            repeat: false,
            note: '',
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateTask = async (props) => {
    const taskRef = doc(fb_db, "tasks", props.id);
    await updateDoc(taskRef, {
        name: props.name,
        step: props.step,
        myDay: props.myDay,
        important: props.important,
        completed: props.completed,
        timeReminder: props.timeReminder,
        dueDate: props.dueDate,
        repeat: props.repeat,
        note: props.note,
    });
}

export const deleteTask = async (id) => {
    await deleteDoc(doc(fb_db, "tasks", id));
}

export const getTask = async (id) => {
    const taskRef = doc(fb_db, "tasks", id.toString());
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
        return { id: taskSnap.id, ...taskSnap.data() };
    } else {
        console.log("No such document!");
    }
}


export const getTasksByIds = async (task_ids) => {
    const tasksPromises = task_ids.map(id => getTask(id));
    const tasks = await Promise.all(tasksPromises);
    return tasks;
}