import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    powerName: string;
    powerLevel: number;
    onPressPower: ((powerValue: number) => void);
}

export const PowerButton = ({ powerName, powerLevel, onPressPower }: Props) => {
    return (
        <TouchableOpacity
            style={styles.powerButton}
            onPress={() => onPressPower(powerLevel)}>
            <Text style={styles.powerButtonText}>{powerName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    powerButton: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#975592',
        backgroundColor: '#975592',
        borderRadius: 10,
        width: 90,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    powerButtonText: {
        fontSize: 11,
        color: 'white',
    },
});
