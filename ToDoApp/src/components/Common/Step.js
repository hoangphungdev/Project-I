import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { deleteStep } from '../../database/TaskDao';

const Step = (props) => {
    const [isComplete, setComplete] = useState(false);
    const [stepName, setStepName] = useState(props.StepName);

    const handlePressComplete = async () => {
        setComplete(!isComplete);
        await deleteStep({ id: props.TaskId, step: props.StepName });
    };

    return (
        <View style={styles.Step}>
            <TouchableOpacity onPress={handlePressComplete}>
                <Image
                    source={isComplete
                        ? require('../../../assets/icons8-checked-48-gray.png')
                        : require('../../../assets/icons8-circle-48-gray.png')}
                    style={styles.iconCircle}
                />
            </TouchableOpacity>

            <TextInput style={[styles.text, isComplete ? styles.strikethrough : null]}
                onChangeText={setStepName}
                value={props.StepName} />
            {/* <Text style={styles.text}>{props.StepName}</Text> */}

            <TouchableOpacity >
                <Image
                    source={require('../../../assets/icons8-ellipsis-30.png')}
                    style={styles.iconEclipsis}
                />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    Step: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 4,
        marginTop: 1,
        minHeight: 30,
    },
    iconCircle: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    iconEclipsis: {
        width: 12,
        height: 12,
    },
    text: {
        fontSize: 16,
        margin: 5,
        flex: 1,
        // outlineWidth: 0,
    },
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationColor: '#656363',
    }
});


export default Step;