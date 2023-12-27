import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateTask } from '../../database/TaskDao';

const Task = (props) => {
    const task = props.task;
    const [isComplete, setComplete] = useState(task.completed);
    const [isImportant, setImportant] = useState(task.important);
    const navigation = useNavigation();

    useEffect(() => {
        setComplete(task.completed);
        setImportant(task.important);
    }, [task]);

    const handlePressComplete = async () => {
        const checked = !isComplete;
        setComplete(checked);
        await updateTask({ id: task.id, completed: checked });
    };

    const handlePressImportant = async () => {
        const checked = !isImportant;
        setImportant(checked);
        await updateTask({ id: task.id, important: checked });
    };

    const handlePress = () => {
        navigation.navigate('UpdateTask', { task: task, nameScreen: props.nameScreen, Screen: props.Screen });
    }

    return (
        <TouchableOpacity
            style={styles.task}
            onPress={handlePress}>
            <TouchableOpacity onPress={handlePressComplete}>
                <Image
                    source={isComplete
                        ? require('../../../assets/icons8-checked-48.png')
                        : require('../../../assets/icons8-circle-48-gray.png')}
                    style={styles.iconCircle}
                />
            </TouchableOpacity>
            <Text style={[styles.text, isComplete ? styles.strikethrough : null]}>{props.task.name}</Text>
            <TouchableOpacity onPress={handlePressImportant}>
                <Image
                    source={isImportant
                        ? require('../../../assets/icons8-star-50-red.png')
                        : require('../../../assets/icons8-star-50.png')}
                    style={styles.iconStar}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 7,
        padding: 10,
        marginTop: 1,
        minHeight: 60,
    },
    iconCircle: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    iconStar: {
        width: 22,
        height: 22,
        marginLeft: 10,
    },
    text: {
        fontSize: 16,
        margin: 5,
        flex: 1,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationColor: '#656363',
    }
});


export default Task;