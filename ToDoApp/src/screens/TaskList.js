import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Task from '../components/Task';


const TaskList = () => {
    const handlePress = () => {
        console.log('Return to Home Screen');
    };
    return (
        <View style={styles.container}>
            <View style={styles.TouchableOpacity}>
                <TouchableOpacity
                    onPress={handlePress}>
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
            <TouchableOpacity style={styles.button}>
                <Image
                    source={require('../../assets/icons8-add-50.png')}
                    style={styles.iconAdd}
                />
                <Text style={styles.buttonText}>Thêm tác vụ</Text>
            </TouchableOpacity>
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
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5EE',
        borderRadius: 5,
        padding: 10,
        marginTop: 1,
        height: 55,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5EE',
        borderRadius: 5,
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
    iconCircle: {
        width: 27,
        height: 27,
        marginRight: 10,
    },
});

export default TaskList
