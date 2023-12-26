import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Task from '../components/Common/Task';
import { AddTaskModal } from '../components/Modal/AddTaskModal';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNewTask } from '../database/TaskDao';
import { UIContext } from '../../UIContext.js';
import { getTaskListsByUserId, addTaskIdToTaskList } from '../database/TaskListDao';
import { getTasksByIds } from '../database/TaskDao';

const TaskList = () => {
    const navigation = useNavigation();
    const { userId } = React.useContext(UIContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            const fetchTasks = async () => {
                const task_ids = await getTaskListsByUserId(userId);
                if (task_ids.length === 0) return;

                const allTasks = await getTasksByIds(task_ids);
                const sortedTasks = [...allTasks].sort((a, b) => a.completed - b.completed);
                setTasks(sortedTasks);
            };

            fetchTasks();
        }, [newTask])
    );

    const handleAddTask = () => {
        setNewTask('');
        setModalVisible(true);
    };

    const handleSaveTask = async () => {
        setModalVisible(false);
        if (newTask.length > 0) {
            const newTaskObj = await createNewTask({ name: newTask });
            await addTaskIdToTaskList({ user_id: userId, task_id: newTaskObj });
            setNewTask('');
        }
    };
    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.header}
                onPress={() => { navigation.navigate('HomeScreen'); }} >
                <Image
                    source={require('../../assets/icons8-less-than-50.png')}
                    style={{ width: 25, height: 25, }} />
                <Text style={styles.headerText}>Danh sách</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.subHeader}>Tác vụ</Text>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}

            </ScrollView>

            <TouchableOpacity
                onPress={handleAddTask}
                style={styles.button}>
                <Image
                    source={require('../../assets/icons8-add-50.png')}
                    style={styles.iconAdd}
                />
                <Text style={styles.buttonText}>Thêm tác vụ</Text>
            </TouchableOpacity>
            <AddTaskModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newTask={newTask}
                setNewTask={setNewTask}
                handleSaveTask={handleSaveTask}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        padding: 10,
        flexDirection: 'column',
    },
    header: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        color: '#EF6363',
    },
    subHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#EF6363',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5EE',
        borderRadius: 7,
        padding: 10,
        marginTop: 10,
        height: 55,
    },
    buttonText: {
        fontSize: 15,
        margin: 5,
    },
    iconLessThan: {
        width: 20,
        height: 20,
    },
    iconAdd: {
        width: 30,
        height: 30,
    },
});

export default TaskList;
