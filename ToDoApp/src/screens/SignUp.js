import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

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
                <TouchableOpacity style={styles.button}>
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