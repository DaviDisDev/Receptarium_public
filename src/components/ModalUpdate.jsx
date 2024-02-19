import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';


const ModalUpdate = ({ modalVisible, setModalVisible, navigation, data }) => {
    const [indicator, setIndicator] = useState(null)

    const editRecipe = () => {

        navigation.navigate('Mis recetas', { parametro: data });

        navigation.navigate('CrearReceta', { parametro: data });

        setModalVisible(false)
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

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Quieres editar esta receta ?</Text>

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
                                onPress={() => editRecipe()}
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

export default ModalUpdate;
