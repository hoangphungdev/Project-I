import { View, Text, TextInput, Button, Keyboard } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import AddNameTask from '../components/Common/AddNameTask';
import AddStep from '../components/Common/AddStep';
import Step from '../components/Common/Step';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { updateTask } from '../database/TaskDao';
import { deleteTask } from '../database/TaskDao';
import { removeTaskIdFromTaskList } from '../database/TaskListDao';
import { UIContext } from '../../UIContext.js';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';




const UpdateTask = () => {
    const { userId } = React.useContext(UIContext);
    const route = useRoute();
    const task = route.params.task;
    const nameScreen = route.params.nameScreen;
    const Screen = route.params.Screen;
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [TaskName, setTaskName] = useState(task.name);
    const [isPressed, setIsPressed] = useState(false);
    const [isCompleteButtonVisible, setIsCompleteButtonVisible] = useState(false);
    const [currentState, setCurrentState] = useState('default');
    const [newStep, setNewStep] = useState('');
    const [steps, setSteps] = useState(task.steps);
    const [isAddMyDay, setIsAddMyDay] = useState(task.myDay);
    const [isAddReminder, setIsAddReminder] = useState(task.timeReminder);
    const [isAddDueDate, setIsAddDueDate] = useState(task.dueDate);
    const [isRepeat, setIsRepeat] = useState(task.repeat);
    const [note, setNote] = useState(task.note);
    const createdAt = formatDistanceToNow(parseISO(task.createdAt), { addSuffix: true, locale: vi });

    const originalName = task.name;


    const handleCompleteAddStep = async () => {
        setIsPressed(false);
        setIsCompleteButtonVisible(false);
        if (newStep.length > 0) {
            console.log('New step: ', newStep);
            setSteps(prevSteps => [...prevSteps, newStep]);

            console.log(task.id);
            await updateTask({ id: task.id, step: newStep });
        }
        setNewStep('');
        Keyboard.dismiss();
    }

    const handleCompleteAddTask = async () => {
        setIsCompleteButtonVisible(false);
        if (TaskName !== originalName) {
            await updateTask({ id: task.id, name: TaskName });
        }
        Keyboard.dismiss();
    }

    const handleAddNote = async () => {
        setIsCompleteButtonVisible(false);
        Keyboard.dismiss();
        await updateTask({ id: task.id, note: note });
    }

    const handleAddMyDay = async () => {
        const checked = !isAddMyDay;
        setIsAddMyDay(checked);
        await updateTask({ id: task.id, myDay: checked });
    }

    const handleAddReminder = () => {
        setIsAddReminder(!isAddReminder);
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    }
    const handleComplete = () => {
        switch (currentState) {
            case 'addStep':
                handleCompleteAddStep();
                break;
            case 'addNameTask':
                handleCompleteAddTask();
                break;
            case 'addNote':
                handleAddNote();
                break;
        }
    }


    const handleDeleteTask = async () => {
        await deleteTask(task.id);
        await removeTaskIdFromTaskList({ user_id: userId, task_id: task.id });
        navigation.navigate(Screen);
    }

    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker_2, setShowDatePicker_2] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');
    const [TaskDueDate, setTaskDueDate] = useState(task.dueDate);

    useEffect(() => {
        if (TaskDueDate != null) {
            const timestamp = { "nanoseconds": TaskDueDate.nanoseconds, "seconds": TaskDueDate.seconds };
            const date = new Date(timestamp.seconds * 1000);
            const formattedDate = format(date, 'dd MMM yyyy');
            setFormattedDate(formattedDate);
        } else {
            setFormattedDate('');
        }

    }, [dueDate, isAddDueDate]);


    const handleAddDueDate = async (event, selectedDate) => {
        const currentDate = selectedDate || dueDate;
        setDueDate(currentDate);
        setIsAddDueDate(true);
        await updateTask({ id: task.id, dueDate: dueDate });
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity stype={{ flexDirection: 'row', alignItems: 'center' }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => { navigation.navigate(Screen) }}>
                    <Image
                        source={require('../../assets/icons8-less-than-50-blue.png')}
                        style={styles.iconLessThan}
                    />
                    <Text style={styles.headerText}>{nameScreen}</Text>
                    <View style={{ flex: 1 }} ></View>
                    {isCompleteButtonVisible && (
                        <TouchableOpacity style={{ marginRight: 10 }}
                            onPress={handleComplete} >
                            <Text style={styles.headerText}>Hoàn thành</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
                <AddNameTask TaskName={TaskName}
                    taskId={task.id}
                    isCompleted={task.completed}
                    isImportant={task.important}
                    setIsCompleteButtonVisible={setIsCompleteButtonVisible}
                    setCurrentState={setCurrentState}
                    setTaskName={setTaskName} />
            </View>
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />


            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    {steps.map((step, index) => (
                        <Step key={index} StepName={step} TaskId={task.id} />
                    ))}
                    {/* <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} /> */}
                    <AddStep
                        isPressed={isPressed}
                        setIsPressed={setIsPressed}
                        setCurrentState={setCurrentState}
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

                    <TouchableOpacity style={styles.addMyDay}
                        onPress={async () => {
                            setIsAddDueDate(!isAddDueDate);
                            setShowDatePicker_2(!isAddDueDate);
                            setTaskDueDate(null);
                            await updateTask({ id: task.id, dueDate: null });
                        }}>
                        <Image
                            source={isAddDueDate
                                ? require('../../assets/icons8-date-48-blue.png')
                                : require('../../assets/icons8-date-48.png')
                            }
                            style={styles.iconSun}
                        />
                        {isAddDueDate
                            ? <Text style={[styles.addMyDayText, { color: '#339AF0' }]}>Đến hạn vào {formattedDate}</Text>
                            : <Text style={[styles.addMyDayText, { color: '#656363' }]}>Thêm ngày đến hạn</Text>
                        }
                        {showDatePicker_2 && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dueDate}
                                mode={'datetime'}
                                is24Hour={true}
                                display="default"
                                onChange={handleAddDueDate}
                                minimumDate={new Date()}
                            />
                        )}
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
                            onFocus={() => {
                                setIsCompleteButtonVisible(true)
                                setCurrentState('addNote')
                            }}
                            multiline={true}
                            onChangeText={setNote}
                            placeholder="Thêm ghi chú"
                            value={note}
                            style={[styles.addMyDayText, { color: '#656363', flex: 1 }]}>
                        </TextInput>
                    </View>
                    {/* <View style={{ height: 200 }} /> */}

                </View>
            </ScrollView >

            <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />
            <View style={styles.footer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.footerText}>Đã tạo {createdAt}</Text>
                </View>
                <TouchableOpacity onPress={handleDeleteTask}>
                    <Image
                        source={require('../../assets/icons8-delete-48.png')}
                        style={styles.iconDelete}
                    />
                </TouchableOpacity>
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