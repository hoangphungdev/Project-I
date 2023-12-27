import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Task from '../components/Common/Task.js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UIContext } from '../../UIContext.js.js';
import { getTaskListsByUserId, addTaskIdToTaskList } from '../database/TaskListDao.js';
import { getCompletedTasksByIds } from '../database/TaskDao.js';

const CompletedList = () => {
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
                const allTasks = await getCompletedTasksByIds(task_ids);
                setTasks(allTasks);
            };
            fetchTasks();
        }, [newTask])
    );


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header}
                onPress={() => { navigation.navigate('HomeScreen'); }} >
                <Image
                    source={require('../../assets/icons8-less-than-50-brown.png')}
                    style={{ width: 25, height: 25, }} />
                <Text style={styles.headerText}>Danh sách</Text>
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.subHeader}>Đã hoàn thành</Text>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} nameScreen={'Đã hoàn thành'} Screen={'CompletedList'} />
                ))}

            </ScrollView>


        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCC4197A',
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
        color: '#8A4515',
    },
    subHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8A4515',
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

export default CompletedList;
