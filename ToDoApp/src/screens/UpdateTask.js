import { View, Text, TextInput, Button, Keyboard } from 'react-native'
import React, { useState, useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import AddNameTask from '../components/Common/AddNameTask';
import AddStep from '../components/Common/AddStep';
import Step from '../components/Common/Step';

const UpdateTask = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [isCompleteButtonVisible, setIsCompleteButtonVisible] = useState(false);
    const [currentState, setCurrentState] = useState('default');
    const [newStep, setNewStep] = useState('');
    const [steps, setSteps] = useState([]);
    const [isAddMyDay, setIsAddMyDay] = useState(false);
    const [isAddReminder, setIsAddReminder] = useState(false);
    const [isAddDueDate, setIsAddDueDate] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const handlePress = () => {
        console.log('Return to Home Screen');
    };

    const handleCompleteAddStep = () => {
        setIsPressed(false);
        setIsCompleteButtonVisible(false);
        if (newStep.length > 0) {
            console.log('New step: ', newStep);
            setSteps(prevSteps => [...prevSteps, newStep]);
        }
        Keyboard.dismiss();
    }

    const handleCompleteAddTask = () => {
        setIsCompleteButtonVisible(false);
        Keyboard.dismiss();
    }

    const handleAddMyDay = () => {
        setIsAddMyDay(!isAddMyDay);
    }

    const handleAddReminder = () => {
        setIsAddReminder(!isAddReminder);
    }

    const handleAddDueDate = () => {
        setIsAddDueDate(!isAddDueDate);
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    }
    const handleComplete = () => {
        switch (currentState) {
            case 'state1':
                // Perform action for state1
                break;
            case 'state2':
                // Perform action for state2
                break;
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={handlePress}>
                    <Image
                        source={require('../../assets/icons8-less-than-50-blue.png')}
                        style={styles.iconLessThan}
                    />
                    <Text style={styles.headerText}>Quan trọng</Text>
                    <View style={{ flex: 1 }} ></View>
                    {isCompleteButtonVisible && (
                        <Button title="Hoàn thành" onPress={handleCompleteAddStep} />
                    )}
                </TouchableOpacity>
                <AddNameTask TaskName="Đi học " />
            </View>
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />

            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {steps.map((step, index) => (
                        <Step key={index} StepName={step} />
                    ))}
                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />
                    <AddStep
                        isPressed={isPressed}
                        setIsPressed={setIsPressed}
                        setIsCompleteButtonVisible={setIsCompleteButtonVisible}
                        setNewStep={setNewStep}
                    />
                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />

                    <TouchableOpacity style={styles.addMyDay} onPress={handleAddMyDay}>
                        <Image
                            source={isAddMyDay
                                ? require('../../assets/icons8-sun-48-blue.png')
                                : require('../../assets/icons8-sun-48.png')
                            }
                            style={styles.iconSun}
                        />
                        {isAddMyDay ? (
                            <>
                                <Text style={[styles.addMyDayText, { color: '#339AF0' }]}>Đã thêm vào Ngày của Tôi</Text>
                            </>
                        ) : (
                            <>
                                <Text style={[styles.addMyDayText, { color: '#656363' }]}>Thêm vào Ngày của Tôi</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />

                    <TouchableOpacity style={styles.addMyDay} onPress={handleAddReminder}>
                        <Image
                            source={isAddReminder
                                ? require('../../assets/icons8-bell-48-blue.png')
                                : require('../../assets/icons8-bell-48.png')
                            }
                            style={styles.iconSun}
                        />
                        <Text style={[styles.addMyDayText, { color: '#656363' }]}>Nhắc tôi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addMyDay} onPress={handleAddDueDate}>
                        <Image
                            source={isAddDueDate
                                ? require('../../assets/icons8-date-48-blue.png')
                                : require('../../assets/icons8-date-48.png')
                            }
                            style={styles.iconSun}
                        />
                        <Text style={[styles.addMyDayText, { color: '#656363' }]}>Thêm ngày đến hạn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addMyDay} onPress={handleRepeat}>
                        <Image
                            source={isRepeat
                                ? require('../../assets/icons8-repeat-48-blue.png')
                                : require('../../assets/icons8-repeat-48.png')
                            }
                            style={styles.iconSun}
                        />
                        <Text style={[styles.addMyDayText, { color: '#656363' }]}>Lặp lại</Text>
                    </TouchableOpacity>
                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />

                    <View style={styles.addNote}>
                        <TextInput
                            onPressIn={() => setIsCompleteButtonVisible(true)}
                            multiline={true}
                            placeholder="Thêm ghi chú"
                            style={[styles.addMyDayText, { color: '#656363', flex: 1 }]}>
                        </TextInput>
                    </View>
                    <View style={{ height: 200 }} />
                </View>
            </ScrollView >

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
        color: '#339AF0',
    },
    iconLessThan: {
        width: 25,
        height: 25,
    },

    content: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    addMyDay: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
    },
    iconSun: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    addMyDayText: {
        fontSize: 15,
    },
    addNote: {
        minHeight: 100,
        flexDirection: 'row',
        marginLeft: 5,
        marginTop: 10,
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