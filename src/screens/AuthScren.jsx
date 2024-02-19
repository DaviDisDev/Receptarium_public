import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const AuthScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "736279271180-f4jvnl258elnfnr0555kd96kmrvt7hjo.apps.googleusercontent.com",
      offlineAccess: true,
    });

  }, []);


  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken
      );

      const { user } = await auth().signInWithCredential(credential);
      const usuarioActual = auth().currentUser;


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // El usuario canceló el inicio de sesión
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // La operación de inicio de sesión está en progreso
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Servicios de juego no disponibles
      } else {
      }
    }
  };

  const signInWithEmail = () => {
    // Navegar a la pantalla de inicio de sesión por correo electrónico
    navigation.navigate('LoginRegister');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Receptarium</Text>

      <Text style={styles.subTitle}>Almacena tus recetas de una forma sencilla </Text>

      <Image
        source={require('../../assets/adaptive-icon.png')} // Ajusta la ruta según la ubicación de tu ícono
        style={styles.iconPrincipal}
      />

      <TouchableOpacity style={styles.button} onPress={() => signInWithGoogle()}>
        <Text style={styles.buttonText}>Entra con Gmail  </Text>
        <Image
          source={require('../../assets/icons8-logo-de-google-64.png')} // Ajusta la ruta según la ubicación de tu ícono
          style={styles.icon}
        />
      </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={() => signInWithEmail()}>
        <Text style={styles.buttonText}>Entra con tu email </Text>
      </TouchableOpacity>

    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
  icon: {
    width: 20,
    height: 20,
    right: 15,
    position: 'absolute'

  },
  iconPrincipal: {
    width: 100,
    height: 100,
    top: -60
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
