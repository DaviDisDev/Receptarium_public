import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Alert, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Recetas from '../screens/Recetas';
import CrearReceta from './../screens/CrearReceta';
import VerRecetasCategoria from '../screens/VerRecetasCategoria';
import VerReceta from './../screens/VerReceta';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RecetasP"
                component={Recetas}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="VerRecetasCategoria"
                component={VerRecetasCategoria}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="VerReceta"
                component={VerReceta}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>
    );
};


const BottomBarNavigator = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [parametro, setParametro] = useState(null);

    useEffect(() => {
        setParametro(route?.params?.parametro);
    }, [route?.params, navigation]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setParametro(null);
        });

        return unsubscribe;
    });

    const editRecipe = (route) => {
        if (parametro && parametro != null) {
            Alert.alert(
                '¡Tienes cambios sin guardar!',
                '¿Quieres salir sin guardar los cambios?',
                [
                    {
                        text: "Cancelar", style: 'cancel', onPress: () => {
                            navigation.navigate('Mis recetas', { parametro: parametro });
                        }
                    },
                    {
                        text: 'Salir',
                        style: 'destructive',
                        onPress: () => {
                            setParametro(null);
                            navigation.navigate(route);
                        },
                    },
                ]
            );
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#94caff',
                tabBarInactiveTintColor: '#ffffff',
                tabBarLabel: route.name,
                tabBarStyle: {
                    backgroundColor: '#F582AE',
                    height: 58,
                    paddingBottom: 1,
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    marginTop: -1,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Recetas"
                component={MainNavigator}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/recipes.png')}
                            style={styles.icon}
                        />
                    ),
                    tabBarLabel: 'Mis Recetas',
                }}
                listeners={{
                    tabPress: (e) => {
                        if (parametro) {
                            e.preventDefault();
                            setParametro(null);
                            editRecipe("Recetas");
                        }
                    },
                }}
            />
            <Tab.Screen
                name="CrearReceta"
                component={CrearReceta}
                options={{
                    tabBarIcon: () => (
                        <Image
                            source={require('../../assets/create-recipe.png')}
                            style={styles.iconCenter}
                        />
                    ),
                    tabBarLabel: 'Crear Receta',

                }}
            />
        </Tab.Navigator>
    );
};


export default BottomBarNavigator;

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F582AE',
        height: 60,
    },
    iconCenter: {
        width: 36,
        height: 36,
    },
    textLogo: {
        fontSize: 30,
        marginTop: 10,
        marginLeft: 10,
        color: '#f7d3e1'
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 5,
        marginTop: 12,
        borderRadius: 20,

    },
});
