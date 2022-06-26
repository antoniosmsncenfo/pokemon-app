import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { PowerButton } from '../components/PowerButton';
import * as Progress from 'react-native-progress';
import { fetchPokemons } from '../api/PokemonService';

interface IPokemonsList {
    name: string;
    url: string;
}

export const MainScreen = () => {
    useEffect(() => {
        fetchPokemons().then((result: IPokemonsList[]) => {
            loadPokemonsList(result);
        });
    }, []);

    const loadPokemonsList = (pokemosList: IPokemonsList[]) => {
        const sortedList = pokemosList.sort((a, b) => {
            return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        });
        setPokemonsList(sortedList);
    };

    const defaultPokemonImage = require('../assets/default-pokemon.png');
    const [dropdownPokemon1, setDropdownPokemon1] = useState<IPokemonsList>({ name: 'Pokemon 1', url: '' });
    const [dropdownPokemon2, setDropdownPokemon2] = useState<IPokemonsList>({ name: 'Pokemon 2', url: '' });
    const [pokemonsList, setPokemonsList] = useState<IPokemonsList[]>([]);
    const [pokemon1Image, setPokemon1Image] = useState(defaultPokemonImage);
    const [pokemon2Image, setPokemon2Image] = useState(defaultPokemonImage);

    const _renderItem = (item: IPokemonsList) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
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
                        data={pokemonsList}
                        search
                        searchPlaceholder="Buscar"
                        labelField="name"
                        valueField="url"
                        placeholder="Seleccione uno"
                        value={dropdownPokemon1}
                        onChange={item => {
                            setDropdownPokemon1(item.value);
                        }}
                        renderItem={item => _renderItem(item)}
                    />
                </View>
                <View style={[styles.dropdownView]}>
                    <Dropdown
                        style={styles.dropdown}
                        containerStyle={styles.shadow}
                        data={pokemonsList}
                        search
                        searchPlaceholder="Buscar"
                        labelField="name"
                        valueField="url"
                        placeholder="Seleccione uno"
                        value={dropdownPokemon2}
                        onChange={item => {
                            setDropdownPokemon2(item.value);
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
            <View style={styles.nameLifeSection}>
                <View style={styles.nameLife}>
                    <Text style={styles.pokemonNameText}>{dropdownPokemon1?.name}</Text>
                    <Progress.Bar progress={0.8} width={100} height={16} />
                </View>
                <View style={styles.nameLife}>
                    <Text style={styles.pokemonNameText}>{dropdownPokemon2?.name}</Text>
                    <Progress.Bar progress={0.8} width={100} height={16} />
                </View>
            </View>
            <View style={styles.powersSection}>
                <View style={styles.pokemonPowerSection}>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 10" value={10} onPressPower={value => { console.log(value); }} />
                        <PowerButton powerName="Poder 20" value={20} onPressPower={value => { console.log(value); }} />
                    </View>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Take down" value={30} onPressPower={value => { console.log(value); }} />
                        <PowerButton powerName="Poder 40" value={40} onPressPower={value => { console.log(value); }} />
                    </View>
                </View>
                <View style={styles.pokemonPowerSection}>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 50" value={50} onPressPower={value => { console.log(value); }} />
                        <PowerButton powerName="Poder 60" value={60} onPressPower={value => { console.log(value); }} />
                    </View>
                    <View style={styles.rowPowerSection}>
                        <PowerButton powerName="Poder 70" value={70} onPressPower={value => { console.log(value); }} />
                        <PowerButton powerName="Poder 80" value={80} onPressPower={value => { console.log(value); }} />
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
    nameLifeSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    nameLife: {
        alignItems: 'center',
    },
    pokemonNameText: {
        paddingBottom: 10,
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
