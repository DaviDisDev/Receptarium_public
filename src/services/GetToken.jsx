import React from 'react';

import auth from '@react-native-firebase/auth';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const GetToken = async (setName, setEmail) => {
    // await new Promise(resolve => setTimeout(resolve, 1000));

    const usuarioActual = auth().currentUser;
    await usuarioActual.reload();
    if (usuarioActual) {
        const password = usuarioActual.uid;
        const email = usuarioActual.email;
        const name = usuarioActual.displayName;

        setEmail(email);
        setName(name);

        let storedToken = "";
        let storedExpirationDate = "";
        let fechaCaducidad = 0;

        try {
            try {
                storedToken = await SecureStore.getItemAsync('token');

                storedExpirationDate = await SecureStore.getItemAsync('expirationDate');

                fechaCaducidad = new Date(storedExpirationDate);
            } catch (error) {

            }

            const fechaActual = new Date();

            if ((storedToken === "" && storedExpirationDate === "") || fechaCaducidad < fechaActual) {
                const response = await axios.post('https://api-receptarium.david-pr.com/api/registerOrLogin', { name, email, password });
                const accessToken = response.data.accessToken;
                const expires_at = response.data.expires_at;
                await SecureStore.setItemAsync('token', accessToken);
                await SecureStore.setItemAsync('expirationDate', expires_at.toString());
            } else {

            }


        } catch (error) {
        }
    } else {
    }
};
export default GetToken 