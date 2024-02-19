import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToolTip = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f582ae56',
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'red',
        width: 280,
        marginHorizontal: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'red'
    }

});

export default ToolTip;
