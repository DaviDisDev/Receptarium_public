import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VerRecetasCategoria = ({ route }) => {
    const navigation = useNavigation();
    const [indicator, setIndicator] = useState(null)
    const [parametro1, setParametro1] = useState(null);

    useEffect(() => {
        setParametro1(route.params?.parametro1);
    }, [route.params?.parametro1]);
    const [parametro2, setParametro2] = useState(null);

    useEffect(() => {
        setParametro2(route.params?.parametro2);
    }, [route.params?.parametro2]);

    // const { parametro2 } = route.params;
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIndicator(true)
            try {
                const storedToken = await SecureStore.getItemAsync('token');

                const axiosInstance = axios.create({
                    baseURL: `https://api-receptarium.david-pr.com/api/recetas-categoria/${parametro1}`,
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                const response = await axiosInstance.get('');
                setData(response.data)

            } catch (error) {
            }
            setIndicator(false)

        };

        fetchData();
    }, [parametro1, navigation]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {indicator ?
                    <View style={styles.indicator}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                    :
                    <>
                        <Text style={styles.title}> {parametro2}</Text>
                        {data.map((receta) => (
                            <TouchableOpacity
                                style={styles.button}
                                key={receta.id}
                                onPress={() => navigation.navigate('VerReceta', receta.id)}
                            >
                                <View style={styles.containerbtn}>
                                    <Text style={styles.textButton}>{receta.titulo} </Text>
                                    <Text style={styles.textTime}>🕐 {receta.tiempo_preparacion}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                        }
                    </>
                }
            </View >
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    indicator: {
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
        width: '100%',
    },
    title: {
        marginTop: 40,
        marginBottom: 70,
        fontSize: 25,
        color: '#F582AE',
        fontWeight: 'bold'
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
    }
});

export default VerRecetasCategoria;
