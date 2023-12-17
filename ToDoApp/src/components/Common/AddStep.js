import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StyleSheet } from 'react-native';

const AddStep = ({ setIsCompleteButtonVisible }) => {
    const [isPressed, setIsPressed] = useState(false);
    const inputRef = useRef(null);

    return (
        <TouchableOpacity style={styles.addStep} onPress={() => {
            setIsPressed(true);
            setIsCompleteButtonVisible(true);
            setTimeout(() => inputRef.current.focus(), 100);
        }}>
            {isPressed ? (
                <>
                    <Image
                        source={require('../../../assets/icons8-circle-48-gray.png')} // Replace this with the path to your other icon
                        style={styles.iconAdd}
                    />
                    <TextInput
                        placeholder='Thêm bước'
                        ref={inputRef}
                        style={styles.textAddStep} />
                </>
            ) : (
                <>
                    <Image
                        source={require('../../../assets/icons8-add-50-blue.png')}
                        style={styles.iconAdd}
                    />
                    <Text style={[styles.textAddStep, { color: '#339AF0' }]}>Thêm bước</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addStep: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        height: 50,
    },
    iconAdd: {
        width: 25,
        height: 25,
        marginLeft: 5,
    },
    textAddStep: {
        fontSize: 15,
        marginLeft: 10,
    },
});

export default AddStep;