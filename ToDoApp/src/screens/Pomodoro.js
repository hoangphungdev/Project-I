import { View, Text, TextInput, Button, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Circle } from 'react-native-svg';

const UpdateTask = () => {
    const [timerStatus, setTimerStatus] = useState('stopped');
    const [selectedButton, setSelectedButton] = useState('Pomodoro');
    const [totalTime, setTotalTime] = useState(25 * 60);
    const navigation = useNavigation();
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        let intervalId;

        if (timerStatus === 'running') {
            intervalId = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [timeLeft, timerStatus]);

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = (timeLeft / totalTime) * circumference;

    return (
        <View style={styles.container}>

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

                </TouchableOpacity>

            </View>
            {/* <View style={{ height: 0.5, width: '100%', backgroundColor: 'white' }} /> */}

            <View style={styles.content}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'Pomodoro' ? styles.selectedButton : null]}
                        onPress={() => {
                            setTimeLeft(25 * 60);
                            setTotalTime(25 * 60);
                            setTimerStatus('stopped');
                            setSelectedButton('Pomodoro');
                        }}
                    >
                        <Text style={styles.buttonText}>Pomo doro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'Short Break' ? styles.selectedButton : null]}
                        onPress={() => {
                            setTimeLeft(5 * 60);
                            setTotalTime(5 * 60);
                            setTimerStatus('stopped');
                            setSelectedButton('Short Break');
                        }}
                    >
                        <Text style={styles.buttonText}>Short Break</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedButton === 'Long Break' ? styles.selectedButton : null]}
                        onPress={() => {
                            setTimeLeft(15 * 60);
                            setTotalTime(15 * 60);
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
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                    )}
                    {timerStatus === 'running' && (
                        <>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    style={styles.controlButton}
                                    onPress={() => setTimerStatus('paused')}
                                >
                                    <Text style={styles.buttonText}>Pause</Text>
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
                                    <Text style={styles.buttonText}>Continue</Text>
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

export default UpdateTask;