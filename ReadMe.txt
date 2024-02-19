PASOS GOOGLE SIGNING CON FIREBASE

npx create-expo-app miProyecto

npx expo install firebase react-native-google-signin

AÑADIR ESTO EN EL ARCHIVO babel.config.js

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};

PARA RESOLVER PORBLEMAS DE PAQUETES

npx expo install --check

PARA GENEREAR LAS CARPETAS ANDROID:
creo que esto no es correcto pero sirve
npx run:android 

PARA ACTUALIZAR LOS ICONOS 
npx expo prebuild

i despues 


 eas build   

 ESTE COMANDO CREO QUE SIRVE PARA PRODUCCION I LA SHA1
(no necesario dev mode)

 eas credentials

PARA LAS CLAVE SHA EN MODO DEV :

keytool -list -v -keystore ./android/app/debug.keystore -alias androiddebugkey -storepass android -keypass android


PARA GENERAR UN APK 

este paso es necesario para que google signin funcion 

npx expo run:android *pero con el emulador genymotion conectado , si no fallara

PARA QUE LA VERSION EN EL MOVIL FISICO FUNCIONE REQUIER METRO SERVER 

npx expo start --dev-client 

PARA EL PACKAJE_NAME:

en el app.json a la altura de android añadir:

 "package": "com.tuempresa.tuproyecto",

FIREBASE ,AÑADIR ESTO A LA RAIZ DEL PROJECTO 
 google-services.json

 LOCAL.PROPERTIES PARA EL SDK

 añador un archivo local.properties en la carpeta android para que se pueda compilar

 sdk.dir=C:/Users/Robus/AppData/Local/Android/Sdk


CUIDADO CON LA IMPORTACION DE PAQUETES 

import { initializeApp } from "firebase/app";
import { getAuth } from "@react-native-firebase/auth"; 

PARA IMPORTAR EN LOS COMPONENTES USAR react-native-firebase/auth";
MANTENER LA COHERENCIA ENTRE PAQUETES