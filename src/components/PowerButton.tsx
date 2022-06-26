import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    powerName: string;
    value: number;
    onPressPower: ((powerValue: number) => void);
}

export const PowerButton = ({ powerName, value, onPressPower }: Props) => {
    return (
        <TouchableOpacity
            style={styles.powerButton}
            onPress={() => onPressPower(value)}>
            <Text style={styles.powerButtonText}>{powerName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    powerButton: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    powerButtonText: {
        fontSize: 16,
    },
});
