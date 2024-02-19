import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const LogOut = async () => {


    try {
        const storedToken = await SecureStore.getItemAsync('token');

        const headers = { Authorization: `Bearer ${storedToken}` };

        const response = await axios.post('https://api-receptarium.david-pr.com/api/logout', {}, { headers });

        await auth().signOut();

        await SecureStore.deleteItemAsync('expirationDate');
        // Elimina el token almacenado
        await SecureStore.deleteItemAsync('token');

    } catch (error) {
    }
};

export default LogOut;
