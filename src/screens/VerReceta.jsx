import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useWindowDimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import ModalCustom from '../components/Modal';
import ModalUpdate from '../components/ModalUpdate';

const VerReceta = ({ route, navigation }) => {
    const windowWidth = useWindowDimensions().width;
    const isFocused = useIsFocused();
    const [parametro, setParametro] = useState(null);
    const [data, setData] = useState(null)
    const [image, setImage] = useState(null)
    const [ingredientes, setIngredientes] = useState([])
    const [pasos, setPasos] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    useEffect(() => {
        setParametro(route.params);
    }, [route.params]);

    useEffect(() => {
        const fetchData = async () => {

            if (!parametro) return;
            try {
                const storedToken = await SecureStore.getItemAsync('token');
                const axiosInstance = axios.create({
                    baseURL: `https://api-receptarium.david-pr.com/api/ver-receta/${parametro}`,
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                const response = await axiosInstance.get('');
                if (response.data.receta.rutaImagenPrincipal) {
                    setImage(response.data.receta.rutaImagenPrincipal)
                }

                setPasos(response.data.pasos)
                const ingredientesString = response.data.receta.ingredientes;
                const array = ingredientesString.includes(',') ? ingredientesString.split(',') : [ingredientesString];
                setIngredientes(array);

                setData(response.data)
            } catch (error) {
            }
        };

        fetchData();
    }, [parametro, isFocused]);




    if (!data) {

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
        <ScrollView >
            <TouchableOpacity style={styles.btnDelete} onPress={() => setModalVisible(true)} >
                <Text style={styles.txtIcon}>🗑️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnDelete, styles.btnEdit]} onPress={() => setModalVisible2(true)} >
                <Text style={styles.txtIcon}>✏️</Text>
            </TouchableOpacity>

            <ModalCustom modalVisible={modalVisible} setModalVisible={setModalVisible} idReceta={parametro} navigation={navigation} />
            <ModalUpdate modalVisible={modalVisible2} setModalVisible={setModalVisible2} data={data} navigation={navigation} />

            {image ? (
                <>
                    <Image
                        source={{ uri: image }}
                        style={[styles.imageReceta, { width: windowWidth }]}
                        resizeMode="cover"
                    />
                    <View style={styles.containerTitle}>
                        <Text style={styles.tituloReceta} >{data.receta.titulo}</Text>
                        <Text style={styles.time} >🕐 {data.receta.tiempo_preparacion}</Text>
                        <Text style={styles.iconoPers}>🍽️</Text>
                        <Text style={styles.personas} >{data.receta.num_personas}</Text>
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.noImage} />
                    <View style={[styles.containerTitle, styles.containerNoImg]}>
                        <Text style={styles.tituloReceta} >{data.receta.titulo}</Text>
                        <Text style={styles.time} >🕐 {data.receta.tiempo_preparacion}</Text>
                        <Text style={styles.iconoPers}>🍽️</Text>
                        <Text style={styles.personas} >{data.receta.num_personas}</Text>
                    </View>
                </>
            )}

            <View style={[styles.container]}>

                <Text style={styles.descripcion} >{data.receta.descripcion}</Text>

                <Text style={styles.titleIng}>Ingredientes</Text>
                <View style={styles.ingContainer}>
                    {ingredientes.map((ingrediente, index) => (
                        <Text style={styles.ing} key={index}>-{ingrediente}</Text>
                    ))}
                </View>

                {pasos && pasos.map((paso, index) => (
                    <View style={styles.containerSteps} key={index}>
                        <Text style={styles.titlePaso} key={paso.id}>
                            Paso {index + 1}: {paso.titulo}
                        </Text>
                        {paso.ruta_imagen && <Image
                            source={{ uri: paso.ruta_imagen }}
                            style={[styles.imagenPasos]}
                            resizeMode="cover"
                        />}
                        <Text key={index}>{paso.descripcion}</Text>
                    </View>
                ))}

            </View>


        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20

    },
    button: {
        width: 300,
        height: 40,
        backgroundColor: '#f582ae',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        alignItems: 'flex-start',
        paddingLeft: 30
    },
    textButton: {
        fontWeight: 'bold',
        color: '#f6e3ea',
        fontSize: 18,

    },
    containerbtn: {
        flexDirection: 'row'
    },
    textTime: {
        marginLeft: 190,
        color: '#f6e3ea',
        position: 'absolute'
    },
    imageReceta: {
        height: 280,
        marginBottom: 10,

    },
    imagenPasos: {
        width: 300,
        height: 200,
        borderRadius: 20,
        marginBottom: 10
    },
    noImage: {
        height: 80,
    },
    containerNoImg: {
        marginTop: 30,
    },
    tituloReceta: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    category: {
        marginBottom: 20,
        marginLeft: 20
    },
    containerTitle: {
        flexDirection: 'row',
        marginLeft: 45,
        marginBottom: 20,
        position: 'absolute',
        backgroundColor: '#ade0fac6',
        paddingLeft: 10,
        borderRadius: 40,
        width: 340,
        height: 55,
        marginTop: 225,

    },
    time: {
        marginTop: 4,
        marginLeft: 235,
        position: 'absolute',
        fontWeight: 'bold',
        color: 'white'
    },
    personas: {
        marginTop: 27,
        marginLeft: 262,
        position: 'absolute',
        fontWeight: 'bold',
        color: 'white',
    },
    iconoPers: {
        fontSize: 23,
        position: 'absolute',
        marginLeft: 230,
        marginTop: 20
    },
    descripcion: {
        marginVertical: 15,
        marginHorizontal: 5,

    },
    titleIng: {
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginBottom: 10
    },
    titlePaso: {
        fontWeight: 'bold',
        marginVertical: 10

    },
    ingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
        marginHorizontal: 10
    },
    ing: {
        paddingHorizontal: 14
    },
    containerSteps: {
        marginHorizontal: 10,
        marginBottom: 30
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDelete: {
        backgroundColor: '#d44f4f',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        position: 'absolute',
        zIndex: 4,
        marginLeft: 315,
        marginTop: 10,
        borderRadius: 10
    },
    btnEdit: {
        marginTop: 60,
        backgroundColor: '#7acef9'
    },
    txtIcon: {
        fontSize: 25
    }

});

export default VerReceta;
