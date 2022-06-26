import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { PowerButton } from '../components/PowerButton';
import * as Progress from 'react-native-progress';

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
    const defaultPokemonImage = require('../assets/default-pokemon.png');
    const [dropdownPokemon1, setDropdownPokemon1] = useState(null);
    const [dropdownPokemon2, setDropdownPokemon2] = useState(null);
    const [pokemon1Image, setPokemon1Image] = useState(defaultPokemonImage);
    const [pokemon2Image, setPokemon2Image] = useState(defaultPokemonImage);

    const _renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <View style={styles.dropdownLabelsSection}>
                <Text>Pokemon 1</Text>
                <Text>Pokemon 2</Text>
            </View>
            <View style={styles.dropdownsSection}>
                <View style={[styles.dropdownView]}>
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.shadow}
                        data={data}
                        search
                        searchPlaceholder="Buscar"
                        labelField="label"
                        valueField="value"
                        placeholder="Seleccione uno"
                        value={dropdownPokemon1}
                        onChange={item => {
                            setDropdownPokemon1(item.value);
                            console.log('selected', item);
                        }}
                        renderItem={item => _renderItem(item)}
                    />
                </View>
                <View style={[styles.dropdownView]}>
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.shadow}
                        data={data}
                        search
                        searchPlaceholder="Buscar"
                        labelField="label"
                        valueField="value"
                        placeholder="Seleccione uno"
                        value={dropdownPokemon2}
                        onChange={item => {
                            setDropdownPokemon2(item.value);
                            console.log('selected', item);
                        }}
                        renderItem={item => _renderItem(item)}
                    />
                </View>
            </View>
            <View style={styles.SelectButtonSection}>
                <TouchableOpacity style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Seleccionar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imagesSection}>
                <Image source={pokemon1Image} />
                <Image source={pokemon2Image} />
            </View>
            <View style={styles.imagesSection}>
                <Text >Nombre Pokemon</Text>
                <Progress.Bar progress={0.8} width={200} height={16} />
            </View>
            <View style={styles.powersSection}>
                <View style={styles.pokemonPowerSection}>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                    </View>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                    </View>
                </View>
                <View style={styles.pokemonPowerSection}>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                    </View>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                        <PowerButton powerName="Poder 1" value={10} onPressPower={(value) => { console.log(value); }} />
                    </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    dropdownLabelsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    dropdownsSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    SelectButtonSection: {
        paddingTop: 20,
    },
    imagesSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    powersSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    pokemonPowerSection: {
        justifyContent: 'space-around',
    },
    rowPowerSection: {
        flexDirection: 'row',
    },
    dropdownView: {
        flex: 1,
    },
    selectButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButtonText: {
        fontSize: 20,
    },
    dropdown: {
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 20,
        marginHorizontal: 5,
        paddingLeft: 10,
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
        paddingLeft: 10,
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
