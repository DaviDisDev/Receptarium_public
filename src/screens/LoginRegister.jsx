import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const signIn = async () => {
        setLoading(true);
        try {
            const res = await auth().signInWithEmailAndPassword(email, password);


        } catch (error) {
            alert('Sign in failed')
        } finally {
            setLoading(false)
        }
    }

    const signUp = async () => {
        if (!email || !password || !name) {
            alert("relleno los campos")
            setIsVisible(true)
            return;
        }

        try {
            setLoading(true);
            const resp = await auth().createUserWithEmailAndPassword(email, password);

            const usuarioCreado = resp.user;

            usuarioCreado.updateProfile({
                displayName: name,
            });


        } catch (error) {
            alert('Sign up failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Receptarium</Text>

            <Text style={styles.subTitle}>Almacena tus recetas de una forma sencilla </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                value={email} />
            {isVisible && (
                <TextInput
                    style={[styles.input, styles.nexInput]}
                    placeholder="name"
                    autoCapitalize="none"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />

            )}


            <TextInput
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true} />

            {
                loading ? (
                    <ActivityIndicator size='large' color='#0000ff' />
                ) :
                    (

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => signIn()}>
                                <Text style={styles.buttonText}>Inicias Sesion</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={() => signUp()}>
                                <Text style={styles.buttonText}>Registrarse</Text>
                            </TouchableOpacity>

                        </View>

                    )
            }
        </View>
    )
}
export default LoginRegister

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        marginVertical: 4,
        height: 40,
        width: 240,
        borderBottomWidth: 1,
        borderColor: '#bababa',
        padding: 10,
    },
    nexInput: {
        borderColor: 'orange',
    },
    button: {
        width: 240,
        height: 30,
        backgroundColor: '#f582ae',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',

    },
    buttonContainer: {
        marginTop: 20
    },
    title: {
        fontSize: 40,
        top: -120,
        color: '#001858',
        fontWeight: 'bold'

    },
    subTitle: {
        top: -120
    }
})