import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import GetToken from '../services/GetToken';
import GetCategorias from '../services/GetCategorias';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


const Recetas = () => {

    const navigation = useNavigation();
    const [indicator, setIndicator] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [categorias, setCategorias] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            const checkPermission = async () => {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission denied', 'Permission to access media library is required.');
                }
            };
            checkPermission();


            const fetchData = async () => {
                setIndicator(true)
                try {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    await GetToken(setName, setEmail);
                    await GetCategorias(setCategorias);

                } catch (error) {
                }
                setIndicator(false)
            };
            fetchData();
        }, []));

    return (
        <View style={styles.container}>

            {categorias.length === 0 ?
                indicator ? (
                    <View style={styles.indicator}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={styles.containerNew}>
                        <Text style={styles.textWelcome}>Bienvenido a receptarium !</Text>
                        <Text>Todavia no tienes ninguna receta guardada.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('CrearReceta')} style={styles.button}>
                            <Text style={styles.textButton}>Crea tu primera receta</Text>
                        </TouchableOpacity>
                    </View>
                ) :
                indicator ? (

                    <View style={styles.indicator}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (<>

                    <Text style={styles.titleRec}>Tus Recetas</Text>


                    {categorias.map((categoria) => (
                        <TouchableOpacity
                            style={styles.button}
                            key={categoria.categoria_id}
                            onPress={() => navigation.navigate('VerRecetasCategoria', { parametro1: categoria.categoria_id, parametro2: categoria.nombre_categoria })}
                        >

                            <Text style={styles.txtBtn}>{categoria.nombre_categoria}  - {categoria.cantidad_recetas}</Text>
                        </TouchableOpacity>
                    ))}

                </>
                )}
        </View>
    );
}

export default Recetas;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f582ae32',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    containerNew: {
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 60,
        height: 300,
        marginHorizontal: 20,
        marginVertical: 120,
        borderRadius: 20
    },
    textWelcome: {
        fontSize: 35,
        paddingBottom: 40,
        color: '#5e7a9a'
    },

    button: {
        width: 240,
        height: 45,
        backgroundColor: '#f582ae',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    textButton: {
        fontWeight: 'bold',
        color: '#fbf2f6',
        fontSize: 18,

    },
    txtBtn: {
        color: '#fbf2f6'
    },
    titleRec: {
        marginTop: -200,
        marginBottom: 70,
        fontSize: 25,
        color: '#F582AE',
        fontWeight: 'bold'
    }
});


