import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { createNewAccount } from '../database/UserDAO';
import { useNavigation } from '@react-navigation/native';
import { checkIfAccountExists } from '../database/UserDAO';

const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const register = async () => {
        // Check if password and enteredPassword are the same
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng");
            return;
        }

        // Check if password is between 6 and 18 characters
        if (password.length < 6 || password.length > 18) {
            alert("Mật khẩu phải từ 6 đến 18 ký tự");
            return;
        }

        // Check if password and enteredPassword are the same
        if (password !== enteredPassword) {
            alert("Mật khẩu nhập lại không khớp");
            return;
        }

        const exists = await checkIfAccountExists(email);
        if (exists) {
            alert("Tài khoản đã tồn tại");
            return;
        }

        try {
            await createNewAccount({ email: email, password: password });
            alert("Đăng ký thành công");
            navigation.navigate('SignIn');
        } catch (error) {
            alert(`Đăng ký thất bại: ${error.message}`);
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
                    placeholder="Mật khẩu bao gồm 6-18 kí tự"
                    secureTextEntry={true} />
                <TextInput style={styles.input}
                    onChangeText={text => setEnteredPassword(text)}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true} />
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.buttonText}>Đăng ký</Text>
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