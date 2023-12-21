import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Task from '../components/Common/Task';
import { AddTaskModal } from '../components/Modal/AddTaskModal';



const TaskList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newTask, setNewTask] = useState('');

    const handlePress = () => {
        console.log('Return to Home Screen');
    };

    const handleAddTask = () => {
        setNewTask('');
        setModalVisible(true);
    };

    const handleSaveTask = () => {
        if (newTask.length > 0) {
            console.log('New task: ', newTask);
        }
        setModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.TouchableOpacity}>
                <TouchableOpacity style={styles.header}
                    onPress={handlePress} >
                    <Image
                        source={require('../../assets/icons8-less-than-50.png')}
                        style={styles.iconLessThan} />
                    <Text style={styles.headerText}>Danh sách</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.subHeader}>Quan trọng</Text>
                <Task taskName="Đi học" />
                <Task taskName="Đi học" />
                <Task taskName="Đi học" />
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
        marginTop: 13,
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
