import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import Task from '../components/Common/Task';
import { AddTaskModal } from '../components/Modal/AddTaskModal';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.headerText}>Tài khoản</Text>
                </TouchableOpacity>
                <Image
                    source={require('../../assets/icons8-search-48.png')}
                    style={styles.iconLessThan}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE4E1',
        flexDirection: 'column',
    },
    header: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default HomeScreen;
