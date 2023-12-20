import { Modal, View, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';



export const AddTaskModal = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            style={{ flex: 1 }}
        >
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={props.handleSaveTask}
                activeOpacity={1}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.centeredView}
                >
                    <View style={styles.modalView}>
                        <Image
                            source={require('../../../assets/icons8-circle-48.png')}
                            style={styles.iconCircle}
                        />
                        <TextInput
                            style={styles.modalText}
                            onChangeText={props.setNewTask}
                            value={props.newTask}
                            placeholder="Nhập tác vụ mới"
                            autoFocus={true}
                        />
                    </View>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        marginTop: 1,
        height: 65,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.45,
        shadowRadius: 5,
    },
    modalText: {
        fontSize: 20,
        marginLeft: 10,
        flex: 1,
        outlineWidth: 0,
    },
    iconCircle: {
        width: 27,
        height: 27,
    },
});

