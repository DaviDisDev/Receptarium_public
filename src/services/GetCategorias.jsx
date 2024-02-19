import React from 'react';

import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const GetCategorias = async (setRecipes) => {

    let storedToken = "";

    try {
        try {
            storedToken = await SecureStore.getItemAsync('token');


        } catch (error) {
        }

        const fechaActual = new Date();

        const axiosInstance = axios.create({
            baseURL: 'https://api-receptarium.david-pr.com/api/',
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        });

        const response = await axiosInstance.get('recetas');
        setRecipes(response.data)

    } catch (error) {
    }

};
export default GetCategorias