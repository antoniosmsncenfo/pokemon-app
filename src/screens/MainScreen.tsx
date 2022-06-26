import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropdownComponent from 'react-native-element-dropdown/lib/typescript/components/Dropdown';
import Dropdown from '../components/Dropdown';

export const MainScreen = () => {
    return (
        <View style={styles.contenedor}>
            <DropdownComponent label="Pokemon 1" />
            <TouchableOpacity>
                <Text>Seleccionar</Text>
            </TouchableOpacity>
            <Dropdown label="Pokemon 2" />
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
    },
});
