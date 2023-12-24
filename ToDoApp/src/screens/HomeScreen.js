import { View, Text } from 'react-native'
import React, { useState, useContext } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UIContext } from '../../UIContext.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
    const navigation = useNavigation();
    const { setUserId } = useContext(UIContext);

    const logout = async () => {
        setUserId(null);
        await AsyncStorage.setItem('userEmail', '');
        await AsyncStorage.setItem('userPassword', '');
        navigation.navigate('SignIn');
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={logout}>
                    <Image
                        source={require('../../assets/icons8-less-than-50-blue.png')}
                        style={styles.iconLessThan} />
                    <Text style={{ fontSize: 20, color: '#339AF0', }}>Đăng xuất</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} ></View>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/icons8-search-48.png')}
                        style={styles.iconSearch}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />
            <ScrollView >
                <View style={styles.content}>
                    <TouchableOpacity style={styles.list} >
                        <Image
                            source={
                                require('../../assets/icons8-sun-48-yellow.png')
                            }
                            style={styles.iconList}
                        />
                        <Text style={[styles.textList, { color: '#656363' }]}>Ngày của tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list} >
                        <Image
                            source={
                                require('../../assets/icons8-star-48.png')
                            }
                            style={styles.iconList}
                        />
                        <Text style={[styles.textList, { color: '#656363' }]}>Quan trọng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list} >
                        <Image
                            source={
                                require('../../assets/icons8-check-48.png')
                            }
                            style={styles.iconList}
                        />
                        <Text style={[styles.textList, { color: '#656363' }]}>Đã hoàn thành</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.list}
                        onPress={() => { navigation.navigate('TaskList') }}>
                        <Image
                            source={
                                require('../../assets/icons8-task-48.png')
                            }
                            style={styles.iconList}
                        />
                        <Text style={[styles.textList, { color: '#656363' }]}>Tác vụ</Text>
                    </TouchableOpacity>
                    <View style={{ height: 0.5, width: '100%', backgroundColor: '#DEDEDE' }} />


                </View>

            </ScrollView>

            <TouchableOpacity onPress={() => { navigation.navigate('Pomodoro') }}
                style={styles.pomodoro}>
                <Image
                    source={require('../../assets/icons8-clock-100.png')
                    }
                    style={{ height: 100, width: 100 }}
                />
            </TouchableOpacity>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    header: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconLessThan: {
        width: 25,
        height: 25,
    },
    iconSearch: {
        width: 25,
        height: 25,
    },

    list: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    iconList: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    textList: {
        fontSize: 17,
        fontWeight: '500',
    },
    pomodoro: {
        alignItems: 'center',
        marginBottom: 10,
    }

});

export default HomeScreen;
