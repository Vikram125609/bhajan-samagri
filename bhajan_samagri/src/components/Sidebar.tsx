import React, { useRef } from 'react';
import { View, Dimensions, PanResponder, Animated, StyleSheet, Button, Text } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

interface Props {
    translateX: Animated.Value
}
export default function Sidebar({ translateX }: Props) {

    const closeSidebar = () => {
        Animated.timing(translateX, {
            toValue: -SIDEBAR_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.container, { transform: [{ "translateX": translateX }] }]}>
            <Button title='Close' onPress={closeSidebar} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#fff',
        zIndex: 2,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 7, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    }
});