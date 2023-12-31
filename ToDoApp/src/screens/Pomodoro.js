import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Circle } from 'react-native-svg';
import TimeAdjustModal from '../components/Modal/TimeAdjustModal';
import { Audio } from 'expo-av';

const Pomodoro = () => {
    const [timerStatus, setTimerStatus] = useState('stopped');
    const [selectedButton, setSelectedButton] = useState('Pomodoro');
    const [totalTime, setTotalTime] = useState(25 * 60);
    const navigation = useNavigation();
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
    const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
    const [longBreakTime, setLongBreakTime] = useState(15 * 60);


    const soundObject = new Audio.Sound();
    soundObject.loadAsync(require('../../assets/sound/Nhac-chuong-bao-thuc.mp3'));

    useEffect(() => {
        let intervalId;

        if (timerStatus === 'running') {
            intervalId = setInterval(async () => {
                setTimeLeft(timeLeft => {
                    if (timeLeft === 0) {
                        clearInterval(intervalId);
                        soundObject.playAsync();
                        return 0;
                    } else {
                        return timeLeft - 1;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft, timerStatus]);


    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = (timeLeft / totalTime) * circumference;

    const handleConfirm = ({ pomodoroTime, shortBreakTime, longBreakTime }) => {
        setPomodoroTime(pomodoroTime * 60);
        setShortBreakTime(shortBreakTime * 60);
        setLongBreakTime(longBreakTime * 60);

        if (selectedButton === 'Pomodoro') {
            setTimeLeft(pomodoroTime * 60);
            setTotalTime(pomodoroTime * 60);
        } else if (selectedButton === 'Short Break') {
            setTimeLeft(shortBreakTime * 60);
            setTotalTime(shortBreakTime * 60);
        } else if (selectedButton === 'Long Break') {
            setTimeLeft(longBreakTime * 60);
            setTotalTime(longBreakTime * 60);
        }
    };



    return (
        <View style={styles.container}>

            <TimeAdjustModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={handleConfirm}
            />

            <View style={styles.header}>
                <TouchableOpacity stype={{ flexDirection: 'row', alignItems: 'center' }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => { navigation.navigate('HomeScreen') }}>
                    <Image
                        source={require('../../assets/icons8-less-than-50-blue.png')}
                        style={styles.iconLessThan}
                    />
                    <Text style={styles.headerText}>Danh sách</Text>
                    <View style={{ flex: 1 }} ></View>

                    <TouchableOpacity
                        onPress={() => setIsModalVisible(true)} >
                        <Image
                            source={require('../../assets/icons8-ellipsis-30.png')}
                            style={styles.iconEclipsis}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>

            </View>
            {/* <View style={{ height: 0.5, width: '100%', backgroundColor: 'white' }} /> */}

            <View style={styles.content}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'Pomodoro' ? styles.selectedButton : null]}
                        onPress={() => {
                            setTimeLeft(pomodoroTime);
                            setTotalTime(pomodoroTime);
                            setTimerStatus('stopped');
                            setSelectedButton('Pomodoro');
                        }}
                    >
                        <Text style={styles.buttonText}>Pomo doro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'Short Break' ? styles.selectedButton : null]}
                        onPress={() => {
                            setTimeLeft(shortBreakTime);
                            setTotalTime(shortBreakTime);
                            setTimerStatus('stopped');
                            setSelectedButton('Short Break');
                        }}
                    >
                        <Text style={styles.buttonText}>Short Break</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'Long Break' ? styles.selectedButton : null]}
                        onPress={() => {
                            setTimeLeft(longBreakTime);
                            setTotalTime(longBreakTime);
                            setTimerStatus('stopped');
                            setSelectedButton('Long Break');
                        }}
                    >
                        <Text style={styles.buttonText}>Long Break</Text>
                    </TouchableOpacity>
                </View>
                <Svg width={radius * 2 + 10} height={radius * 2 + 10}>
                    <Circle
                        stroke="white"
                        fill="none"
                        cx={radius + 5}
                        cy={radius + 5}
                        r={radius}
                        strokeWidth={10}
                    />
                    <Circle
                        stroke="#339AF0"
                        fill="none"
                        cx={radius + 5}
                        cy={radius + 5}
                        r={radius}
                        strokeWidth={10}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        rotation="-90"
                        origin={`${radius + 5}, ${radius + 5}`}
                    />
                </Svg>
                <Text style={styles.timeText}>{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}</Text>

                <View style={styles.controlButtonContainer}>
                    {timerStatus === 'stopped' && (
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => setTimerStatus('running')}
                        >
                            <Text style={styles.buttonText}>Bắt đầu</Text>
                        </TouchableOpacity>
                    )}
                    {timerStatus === 'running' && (
                        <>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.controlButton}
                                    onPress={() => {
                                        setTimerStatus('paused')
                                        soundObject.stopAsync()
                                    }}>
                                    <Text style={styles.buttonText}>Dừng lại</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.controlButton}
                                    onPress={() => {
                                        setTimerStatus('stopped');
                                        setTimeLeft(totalTime);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Làm mới</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    {timerStatus === 'paused' && (
                        <>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.controlButton}
                                    onPress={() => setTimerStatus('running')}
                                >
                                    <Text style={styles.buttonText}>Tiếp tục</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.controlButton}
                                    onPress={() => {
                                        setTimerStatus('stopped');
                                        setTimeLeft(totalTime);
                                    }}
                                >
                                    <Text style={styles.buttonText}>Làm mới</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
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
    iconEclipsis: {
        width: 20,
        height: 20,
        marginRight: 10,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FA5252B5',
        borderRadius: 10,
    },
    timeText: {
        position: 'absolute',
        fontSize: 40, // Tăng kích thước chữ
        fontWeight: '500',
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    selectedButton: {
        backgroundColor: '#339AF0',
    },
    controlButtonContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        width: 120,
        padding: 10,
        backgroundColor: '#339AF0',
        borderRadius: 5,
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
});

export default Pomodoro;