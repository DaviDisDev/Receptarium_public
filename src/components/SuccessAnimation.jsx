import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';

const SuccessAnimation = ({ success, message }) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (success) {
            opacity.value = withTiming(1, { duration: 500, easing: Easing.ease });
            setTimeout(() => {
                opacity.value = withTiming(0, { duration: 500, easing: Easing.ease });
            }, 2000);
        }
    }, [success]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <Animated.View style={[styles.container, animatedStyle]}>
            <View style={styles.successBox}>
                <Text style={styles.successText}>{message}</Text>
            </View>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 3,
        flex: 1,
        height: 750,


    },
    successBox: {
        backgroundColor: 'green',
        padding: 20,
        borderRadius: 10,
    },
    successText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },

});

export default SuccessAnimation;
