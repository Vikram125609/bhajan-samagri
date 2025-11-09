import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

interface Props {
    title: string;
    openSidebar: () => void;
}

export default function Header({ title, openSidebar }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={openSidebar}>
                <Text style={[styles.title, { paddingRight: 8 }]}>
                    &#9776;
                </Text>
            </TouchableOpacity>
            <Text style={[styles.title, { paddingLeft: 8 }]}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8400ffff',
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        zIndex: 0,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
});
