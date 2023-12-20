import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.headerText}>Tài khoản</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} ></View>
                <Image
                    source={require('../../assets/icons8-search-48.png')}
                    style={styles.iconSearch}
                />
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
                    <TouchableOpacity style={styles.list} >
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
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
});

export default HomeScreen;
