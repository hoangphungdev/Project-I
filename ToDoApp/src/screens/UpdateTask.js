import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { AddTaskModal } from '../components/Modal/AddTaskModal';
import Task from '../components/Common/Task';


const UpdateTask = () => {
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

            <View style={styles.header}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={handlePress}>
                    <Image
                        source={require('../../assets/icons8-less-than-50.png')}
                        style={styles.iconLessThan}
                    />
                    <Text style={styles.headerText}>Quan trọng</Text>
                </TouchableOpacity>
                <Task taskName="Đi học " />
            </View>
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />

            <ScrollView
                // style={{ backgroundColor: '#E6E6FA' }}
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.addStep}>Thêm bước</Text>
                    <Text style={styles.notification}>Đã thêm vào Ngày của Tôi</Text>
                    <View style={styles.iconContainer}>
                        <Text style={styles.icon}>Nhắc tới</Text>
                        <Text style={styles.icon}>Thêm ngày đến hạn</Text>
                        <Text style={styles.icon}>Lặp lại</Text>
                        <Text style={styles.icon}>Thêm tệp</Text>
                        <Text style={styles.icon}>Thêm ghi chú</Text>
                    </View>

                </View>
            </ScrollView>

            <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />
            <View style={styles.footer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.footerText}>Đã thêm vài giây trước</Text>
                </View>
                <Image
                    source={require('../../assets/icons8-delete-48.png')}
                    style={styles.iconDelete}
                />
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    header: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 20,
        color: '#EF6363',
    },
    iconLessThan: {
        width: 25,
        height: 25,
    },

    content: {
        marginLeft: 10,
        marginRight: 10,
    },
    icon: {
        height: 30,
    },

    footer: {
        height: 45,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 20,
    },
    footerText: {
        fontSize: 15,
        color: '#656363',
        justifyContent: 'center',
    },
    iconDelete: {
        width: 25,
        height: 25,
    },
});

export default UpdateTask;
