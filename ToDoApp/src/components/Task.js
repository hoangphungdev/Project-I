import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const Task = ({ taskName }) => {
    const [isComplete, setComplete] = useState(false);
    const [isImportant, setImportant] = useState(false);

    const handlePressComplete = () => {
        setComplete(!isComplete);
    };

    const handlePressImportant = () => {
        setImportant(!isImportant);
    };

    return (
        <View style={styles.task}>
            <TouchableOpacity onPress={handlePressComplete}>
                <Image
                    source={isComplete
                        ? require('../../assets/icons8-circle-48.png')
                        : require('../../assets/icons8-checked-48.png')}
                    style={styles.iconCircle}
                />
            </TouchableOpacity>
            <Text style={styles.text}>{taskName}</Text>
            <TouchableOpacity onPress={handlePressImportant}>
                <Image
                    source={isImportant
                        ? require('../../assets/icons8-star-50.png')
                        : require('../../assets/icons8-star-50-red.png')}
                    style={styles.iconStar}
                />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    task: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#white',
        borderRadius: 5,
        padding: 10,
        marginTop: 1,
        minHeight: 60,
    },
    iconCircle: {
        width: 27,
        height: 27,
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