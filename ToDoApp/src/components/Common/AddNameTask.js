import React, { useState } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, TextInput, View } from 'react-native';

const AddNameTask = ({ TaskName }) => {
    const [isComplete, setComplete] = useState(false);
    const [isImportant, setImportant] = useState(false);


    const handlePressComplete = () => {
        setComplete(!isComplete);
    };

    const handlePressImportant = () => {
        setImportant(!isImportant);
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
            <TextInput style={styles.text}>{TaskName}</TextInput>
            <TouchableOpacity onPress={handlePressImportant}>
                <Image
                    source={isImportant
                        ? require('../../../assets/icons8-star-50-red.png')
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
        fontWeight: 'bold',
    },
});


export default AddNameTask;