import { Modal, View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Task from '../components/Task';
import { KeyboardAvoidingView, Platform } from 'react-native';



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
                <TouchableOpacity
                    onPress={handlePress}
                >
                    <Text style={styles.header}>
                        <Image
                            source={require('../../assets/icons8-less-than-50.png')}
                            style={styles.iconLessThan}
                        />
                        Danh sách
                    </Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.subHeader}>Quan trọng</Text>
                <Task taskName="Đi học là một điều vui là một điều vui" />
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{ flex: 1 }}
            >
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={handleSaveTask}
                    activeOpacity={1}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.centeredView}
                    >
                        <View style={styles.modalView}>
                            <Image
                                source={require('../../assets/icons8-circle-48.png')}
                                style={styles.iconAdd}
                            />
                            <TextInput
                                style={styles.modalText}
                                onChangeText={setNewTask}
                                value={newTask}
                                placeholder="Nhập tác vụ mới"
                                autoFocus={true}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </TouchableOpacity>
            </Modal>
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
        fontSize: 20,
        color: '#EF6363',
        marginTop: 13,
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
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        marginTop: 1,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 5,
    },
    modalText: {
        fontSize: 20,
        marginLeft: 10,
    },
});

export default TaskList
