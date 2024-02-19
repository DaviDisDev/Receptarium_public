import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar
} from 'react-native';

const Header = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.textLogo}>Recepetarium</Text>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.icon}
            />

        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        flexDirection: "row",
        backgroundColor: '#F582AE',
        height: 85,
        justifyContent: 'center',
        alignItems: 'center'

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