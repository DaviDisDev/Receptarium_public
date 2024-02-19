import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SuccessAnimation from './SuccessAnimation';

const ModalCustom = ({ modalVisible, setModalVisible, idReceta, navigation }) => {
    const [success, setSuccess] = useState(false);
    const [indicator, setIndicator] = useState(null)
    const deleteRecipe = async () => {
        setIndicator(true)
        try {

            const storedToken = await SecureStore.getItemAsync('token');

            const axiosInstance = axios.create({
                baseURL: `https://api-receptarium.david-pr.com/api/recetas/${idReceta}`,
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });

            const response = await axiosInstance.delete('');
            if (response.status === 200) {

                setSuccess(true)

                navigation.navigate('RecetasP');
            }
        } catch (error) {
        }

    }


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            {success && <SuccessAnimation success={success} message={"Exito al borrar  la receta"} />}

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Quieres eliminar esta receta ?</Text>

                    {indicator ?
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                        :
                        <View style={styles.containerBtn}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => deleteRecipe()}
                            >
                                <Text style={styles.textStyle}>Si</Text>
                            </Pressable>
                        </View>
                    }

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 15,
        width: 55,
        height: 55,
        justifyContent: 'center',
        borderRadius: 30
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default ModalCustom;
