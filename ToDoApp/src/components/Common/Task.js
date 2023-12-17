import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Task = ({ taskName }) => {
    const [isComplete, setComplete] = useState(false);
    const [isImportant, setImportant] = useState(false);


    const handlePressComplete = () => {
        setComplete(!isComplete);
    };

    const handlePressImportant = () => {
        setImportant(!isImportant);
    };

    const handlePress = () => {
        console.log('Task is pressed');
    }



    return (
        <TouchableOpacity
            style={styles.task}
            onPress={handlePress}>
            <TouchableOpacity onPress={handlePressComplete}>
                <Image
                    source={isComplete
                        ? require('../../../assets/icons8-circle-48.png')
                        : require('../../../assets/icons8-checked-48.png')}
                    style={styles.iconCircle}
                />
            </TouchableOpacity>
            <Text style={styles.text}>{taskName}</Text>
            <TouchableOpacity onPress={handlePressImportant}>
                <Image
                    source={isImportant
                        ? require('../../../assets/icons8-star-50.png')
                        : require('../../../assets/icons8-star-50-red.png')}
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
});


export default Task;