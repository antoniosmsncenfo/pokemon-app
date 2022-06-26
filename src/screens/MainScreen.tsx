import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';

const data = [
    { label: 'Item 1', value: '1', data: 50 },
    { label: 'Item 2', value: '2', data: 50 },
    { label: 'Item 3', value: '3', data: 50 },
    { label: 'Item 4', value: '4', data: 50 },
    { label: 'Item 5', value: '5', data: 50 },
    { label: 'Item 6', value: '6', data: 50 },
    { label: 'Item 7', value: '7', data: 50 },
    { label: 'Item 8', value: '8', data: 50 },
];


export const MainScreen = () => {
    const [dropdownPokemon1, setDropdownPokemon1] = useState(null);
    const [dropdownPokemon2, setDropdownPokemon2] = useState(null);

    const _renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    return (
        <View style={styles.contenedor}>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={data}
                search
                searchPlaceholder="Buscar"
                labelField="label"
                valueField="value"
                placeholder="Seleccione un Pokemon"
                value={dropdownPokemon1}
                onChange={item => {
                    setDropdownPokemon1(item.value);
                    console.log('selected', item);
                }}
                renderItem={item => _renderItem(item)}
            />
            <TouchableOpacity>
                <Text>Seleccionar</Text>
            </TouchableOpacity>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.shadow}
                data={data}
                search
                searchPlaceholder="Buscar"
                labelField="label"
                valueField="value"
                placeholder="Seleccione un Pokemon"
                value={dropdownPokemon2}
                onChange={item => {
                    setDropdownPokemon2(item.value);
                    console.log('selected', item);
                }}
                renderItem={item => _renderItem(item)}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
});
