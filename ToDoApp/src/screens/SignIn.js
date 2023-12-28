import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAccount } from '../database/UserDAO';
import { UIContext } from '../../UIContext.js';

const SignIn = () => {
    const { setUserId } = React.useContext(UIContext);
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //Hàm tự động đăng nhập
        const autoLogin = async () => {
            const email = await AsyncStorage.getItem('userEmail');
            const password = await AsyncStorage.getItem('userPassword');

            if (email && password) {
                const userId = await checkAccount({ email: email, password: password });
                if (userId) {
                    setUserId(userId);
                    navigation.navigate('HomeScreen');
                }
            }
        };

        autoLogin();
    }, []);

    //Hàm đăng nhập
    const handleLogin = async () => {
        // Kiểm tra email có đúng định dạng không
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng");
            return;
        }

        // Kiểm tra mật khẩu có từ 6 đến 18 ký tự không
        if (password.length < 6 || password.length > 18) {
            alert("Mật khẩu phải từ 6 đến 18 ký tự");
            return;
        }

        try {
            const userId = await checkAccount({ email: email, password: password });
            if (userId) {
                // Lưu userId vào UIContext
                setUserId(userId);
                // Lưu email và password vào AsyncStorage
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
            } else {
                console.error("Error: Invalid email or password");
                alert("Email hoặc mật khẩu không đúng");
                return;
            }
            navigation.navigate('HomeScreen');
        } catch (error) {
            alert(`Đăng nhập thất bại: ${error.message}`);
        }

    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/MS-To-Do-Icon.png')}
                style={styles.logo}
            />

            <View style={styles.Login}>
                <TextInput style={styles.input}
                    onChangeText={text => setEmail(text)}
                    placeholder="Địa chỉ email" />
                <TextInput style={styles.input}
                    onChangeText={text => setPassword(text)}
                    placeholder="Mật khẩu"
                    secureTextEntry={true} />
                <TouchableOpacity style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                    <View style={{ flex: 1, height: 0.5, backgroundColor: '#DEDEDE' }} />
                    <View>
                        <Text style={{ width: 50, textAlign: 'center', color: '#656363' }}>hoặc</Text>
                    </View>
                    <View style={{ flex: 1, height: 0.5, backgroundColor: '#DEDEDE' }} />
                </View>


                <TouchableOpacity style={styles.signupButton}
                    onPress={() => { navigation.navigate('SignUp') }}>
                    <Text style={styles.signupButtonText}>Đăng ký</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 100,
        alignSelf: 'center',
    },
    Login: {
        flexDirection: 'column',
        margin: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        height: 45,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#339AF0',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    signupButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#339AF0',
        padding: 10,
        borderRadius: 5,
    },
    signupButtonText: {
        color: '#339AF0',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default SignIn;