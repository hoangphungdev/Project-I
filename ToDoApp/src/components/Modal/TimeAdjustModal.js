import React, { useState } from 'react';
import {
    Modal, View, TextInput, Button, StyleSheet,
    Alert, TouchableOpacity, Image, Text, TouchableWithoutFeedback, Keyboard
} from 'react-native';


const TimeAdjustModal = ({ isVisible, onClose, onConfirm }) => {
    const [pomodoroTime, setPomodoroTime] = useState('');
    const [shortBreakTime, setShortBreakTime] = useState('');
    const [longBreakTime, setLongBreakTime] = useState('');

    const handleConfirm = () => {
        const pomodoro = parseInt(pomodoroTime, 10);
        const shortBreak = parseInt(shortBreakTime, 10);
        const longBreak = parseInt(longBreakTime, 10);

        if (Number.isInteger(pomodoro) && pomodoro >= 1 && Number.isInteger(shortBreak) && shortBreak >= 1 && Number.isInteger(longBreak) && longBreak >= 1) {
            onConfirm({
                pomodoroTime: pomodoro,
                shortBreakTime: shortBreak,
                longBreakTime: longBreak,
            });
            onClose();
        } else {
            Alert.alert('Invalid input', 'Hãy nhập số nguyên lớn hơn hoặc bằng một');
        }
    };



    return (
        <Modal visible={isVisible} onRequestClose={onClose}>
            <View style={styles.header}>
                <TouchableOpacity stype={{ flexDirection: 'row', alignItems: 'center' }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={onClose}>
                    <Image
                        source={require('../../../assets/icons8-less-than-50-blue.png')}
                        style={styles.iconLessThan}
                    />
                    <Text style={styles.headerText}>Pomodoro</Text>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={{ marginRight: 15 }}
                        onPress={handleConfirm}>
                        <Text style={styles.headerText}>Hoàn thành</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>

                    <Text style={styles.text}>Pomodoro Time</Text>
                    <TextInput
                        value={pomodoroTime}
                        onChangeText={setPomodoroTime}
                        placeholder="Pomodoro Time (in minutes)"
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Text style={styles.text}>Short Break Time</Text>
                    <TextInput
                        value={shortBreakTime}
                        onChangeText={setShortBreakTime}
                        placeholder="Short Break Time (in minutes)"
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Text style={styles.text}>Long Break Time</Text>
                    <TextInput
                        value={longBreakTime}
                        onChangeText={setLongBreakTime}
                        placeholder="Long Break Time (in minutes)"
                        keyboardType="numeric"
                        style={styles.input}
                    />
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    headerText: {
        justifyContent: 'center',
        fontSize: 20,
        color: '#339AF0',
    },
    iconLessThan: {
        width: 25,
        height: 25,
    },
    text: {
        fontSize: 17,
        color: '#339AF0',
    },
    input: {
        height: 40,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '80%',
    },
});

export default TimeAdjustModal;