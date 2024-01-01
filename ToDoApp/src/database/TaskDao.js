import { fb_db } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, arrayUnion, arrayRemove } from "firebase/firestore";


export const createNewTask = async (props) => {
    try {
        const docRef = await addDoc(collection(fb_db, "tasks"), {
            name: props.name,
            steps: [],
            myDay: false,
            important: false,
            completed: false,
            timeReminder: null,
            dueDate: null,
            repeat: false,
            note: '',
            createdAt: new Date().toISOString(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const updateTask = async (props) => {
    const taskRef = doc(fb_db, "tasks", props.id);

    let updateObject = {};

    if (props.name !== undefined) {
        updateObject.name = props.name;
    }
    if (props.step !== undefined) {
        updateObject.steps = arrayUnion(props.step);
    }
    if (props.myDay !== undefined) {
        updateObject.myDay = props.myDay;
    }
    if (props.important !== undefined) {
        updateObject.important = props.important;
    }
    if (props.completed !== undefined) {
        updateObject.completed = props.completed;
    }
    if (props.timeReminder !== undefined) {
        updateObject.timeReminder = props.timeReminder;
    }
    if (props.dueDate !== undefined) {
        updateObject.dueDate = props.dueDate;
    }
    if (props.repeat !== undefined) {
        updateObject.repeat = props.repeat;
    }
    if (props.note !== undefined) {
        updateObject.note = props.note;
    }

    await updateDoc(taskRef, updateObject);
}

export const deleteStep = async (props) => {
    console.log(props);
    const taskRef = doc(fb_db, "tasks", props.id);

    let updateObject = {};

    if (props.step !== undefined) {
        updateObject.steps = arrayRemove(props.step);
    }
    await updateDoc(taskRef, updateObject);
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

export const createNewImportantTask = async (props) => {
    try {
        const docRef = await addDoc(collection(fb_db, "tasks"), {
            name: props.name,
            steps: [],
            myDay: false,
            important: true,
            completed: false,
            timeReminder: null,
            dueDate: null,
            repeat: false,
            note: '',
            createdAt: new Date().toISOString(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getImportantTask = async (id) => {
    const taskRef = doc(fb_db, "tasks", id.toString());
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists() && taskSnap.data().important === true
        && taskSnap.data().completed === false) {
        return { id: taskSnap.id, ...taskSnap.data() };
    }
}


export const getImportantTasksByIds = async (task_ids) => {
    const tasksPromises = task_ids.map(id => getImportantTask(id));
    const tasks = await Promise.all(tasksPromises);
    return tasks.filter(task => task !== undefined);
}


export const getCompletedTask = async (id) => {
    const taskRef = doc(fb_db, "tasks", id.toString());
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists() && taskSnap.data().completed === true) {
        return { id: taskSnap.id, ...taskSnap.data() };
    }
}


export const getCompletedTasksByIds = async (task_ids) => {
    const tasksPromises = task_ids.map(id => getCompletedTask(id));
    const tasks = await Promise.all(tasksPromises);
    return tasks.filter(task => task !== undefined);
}


export const createNewMyDayTask = async (props) => {
    try {
        const docRef = await addDoc(collection(fb_db, "tasks"), {
            name: props.name,
            steps: [],
            myDay: true,
            important: false,
            completed: false,
            timeReminder: null,
            dueDate: null,
            repeat: false,
            note: '',
            createdAt: new Date().toISOString(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const getMyDayTask = async (id) => {
    const taskRef = doc(fb_db, "tasks", id.toString());
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists() && taskSnap.data().myDay === true
        && taskSnap.data().completed === false) {
        return { id: taskSnap.id, ...taskSnap.data() };
    }
}




export const getMyDayTasksByIds = async (task_ids) => {
    const tasksPromises = task_ids.map(id => getMyDayTask(id));
    const tasks = await Promise.all(tasksPromises);
    return tasks.filter(task => task !== undefined);
}


export const getDueDateTask = async (id) => {
    const taskRef = doc(fb_db, "tasks", id.toString());
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists() && taskSnap.data().dueDate != null
        && taskSnap.data().completed === false) {
        return { id: taskSnap.id, ...taskSnap.data() };
    }
}


export const getDueDateTasksByIds = async (task_ids) => {
    const tasksPromises = task_ids.map(id => getDueDateTask(id));
    const tasks = await Promise.all(tasksPromises);
    return tasks.filter(task => task !== undefined);
}
