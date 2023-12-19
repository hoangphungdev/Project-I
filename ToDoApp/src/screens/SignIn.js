import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30, marginBottom: 30 }}>
                    <View style={{ flex: 1, height: 0.5, backgroundColor: '#DEDEDE' }} />
                    <View>
                        <Text style={{ width: 50, textAlign: 'center', color: '#656363' }}>hoặc</Text>
                    </View>
                    <View style={{ flex: 1, height: 0.5, backgroundColor: '#DEDEDE' }} />
                </View>


                <TouchableOpacity style={styles.signupButton}>
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