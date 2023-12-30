import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, TextInput, View } from 'react-native';
import { updateTask } from '../../database/TaskDao';

const AddNameTask = (props) => {
    const [isComplete, setComplete] = useState(props.isCompleted);
    const [isImportant, setImportant] = useState(props.isImportant);


    const handlePressComplete = async () => {
        const checked = !isComplete;
        setComplete(checked);
        await updateTask({ id: props.taskId, completed: checked });
    };

    const handlePressImportant = async () => {
        const checked = !isImportant;
        setImportant(checked);
        await updateTask({ id: props.taskId, important: checked });
    };

    return (
        <View style={styles.AddNameTask}>
            <TouchableOpacity onPress={handlePressComplete}>
                <Image
                    source={isComplete
                        ? require('../../../assets/icons8-checked-48-gray.png')
                        : require('../../../assets/icons8-circle-48-gray.png')}
                    style={styles.iconCircle}
                />
            </TouchableOpacity>
            <TextInput style={[styles.text, isComplete ? styles.strikethrough : null]}
                onFocus={() => {
                    props.setIsCompleteButtonVisible(true)
                    props.setCurrentState('addNameTask')
                }}
                value={props.TaskName}
                onChangeText={text => props.setTaskName(text)} />
            <TouchableOpacity onPress={handlePressImportant}>
                <Image
                    source={isImportant
                        ? require('../../../assets/icons8-star-50-gray.png')
                        : require('../../../assets/icons8-star-50.png')}
                    style={styles.iconStar}
                />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    AddNameTask: {
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
        fontSize: 22,
        margin: 5,
        flex: 1,
        fontWeight: '500',
        // outlineWidth: 0,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationColor: '#656363',
    }
});


export default AddNameTask;