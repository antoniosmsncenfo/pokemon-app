import React, { useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import { PowerButton } from '../components/PowerButton';
import * as Progress from 'react-native-progress';
import { fetchPokemon, fetchPokemons } from '../api/PokemonService';
import { PokemonInfo } from '../PokemonInfo.model';

interface IPokemon {
    name: string;
    url: string;
    life: number;
    currentLife: number
    image: any;
    powers: IPower[];
}

interface IPower {
    id: number; name: string; powerLevel: number;
}

const defaultPokemonInfo: IPokemon = {
    name: 'Pokemon 2',
    url: '',
    life: 100,
    currentLife: 100,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
    powers: [
        { id: 0, name: 'Mega-Punch', powerLevel: 10 },
        { id: 1, name: 'Jump', powerLevel: 20 },
        { id: 2, name: 'Snatch', powerLevel: 30 },
        { id: 3, name: 'Crunch', powerLevel: 40 },
    ],
};

export const MainScreen = () => {
    const [dropdownPokemon1, setDropdownPokemon1] = useState<IPokemon>(defaultPokemonInfo);
    const [dropdownPokemon2, setDropdownPokemon2] = useState<IPokemon>(defaultPokemonInfo);
    const [pokemonsList, setPokemonsList] = useState<IPokemon[]>([]);
    const [pokemon1Info, setPokemon1Info] = useState<IPokemon>(defaultPokemonInfo);
    const [pokemon2Info, setPokemon2Info] = useState<IPokemon>(defaultPokemonInfo);

    useEffect(() => {
        fetchPokemons().then((result: IPokemon[]) => {
            loadPokemonListFromApi(result);
        });
    }, []);

    const loadPokemonListFromApi = (result: IPokemon[]) => {
        let sortedList: IPokemon[] = result.map((item: IPokemon) => {
            return { ...defaultPokemonInfo, name: item.name, url: item.url };
        });
        sortedList = result.sort((a, b) => {
            return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
        });
        setPokemonsList(sortedList);
    };

    const powersGenerate = async (pokemon: PokemonInfo): Promise<IPower[]> => {
        const movesPokemon = [];
        for (let i = 0; i < 4; i++) {
            const indice = Math.floor(Math.random() * pokemon.moves.length);
            movesPokemon.push(pokemon.moves[indice]);
        }

        const promesas = movesPokemon.map((ataque) => {
            console.log(ataque.move.url);
            return fetch(ataque.move.url);
        });

        const respuestas = await Promise.all(promesas);

        const ataques = await Promise.all(
            respuestas.map((respuesta) => {
                return respuesta.json();
            })
        );

        return ataques.map((ataque, index) => {
            return { id: index, name: ataque.name, powerLevel: ataque.power || 10 };
        }
        );
    };

    const getPokemonInfo = () => {
        dropdownPokemon1.url && fetchPokemon(dropdownPokemon1.url).then((result: PokemonInfo) => {
            powersGenerate(result).then((powers) => {
                setPokemon1Info({
                    ...dropdownPokemon1,
                    life: result.stats[0].base_stat,
                    image: result.sprites.front_default,
                    currentLife: result.stats[0].base_stat,
                    powers,
                });
            });

            console.log(pokemon1Info);
        });
        dropdownPokemon2.url && fetchPokemon(dropdownPokemon2.url).then((result: PokemonInfo) => {
            powersGenerate(result).then((powers) => {
                setPokemon2Info({
                    ...dropdownPokemon2,
                    life: result.stats[0].base_stat,
                    image: result.sprites.front_default,
                    currentLife: result.stats[0].base_stat,
                    powers,
                });
            });
            console.log(pokemon2Info);
        });
    };

    const attact = (attackingPokemon: IPokemon, powerLevel: number) => {
        if (attackingPokemon.name === pokemon1Info.name) {
            let currentLife = pokemon2Info.currentLife - powerLevel;
            currentLife = currentLife <= 0 ? 0 : currentLife;
            console.log(currentLife);
            setPokemon2Info({ ...pokemon2Info, currentLife });
        }
        else {
            let currentLife = pokemon1Info.currentLife - powerLevel;
            currentLife = currentLife <= 0 ? 0 : currentLife;
            setPokemon1Info({ ...pokemon1Info, currentLife });
        }
    };

    const _renderItem = (item: IPokemon) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.name}</Text>
            </View>
        );
    };
    return (
        <View style={{ height: '100%', backgroundColor: '#FFFC9B' }}>
            <View style={styles.container}>
                <View style={styles.dropdownLabelsSection}>
                    <Text style={styles.dropdownLabelText}>Pokemon 1</Text>
                    <Text style={styles.dropdownLabelText}>Pokemon 2</Text>
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
                                setDropdownPokemon1({ ...defaultPokemonInfo, name: item.name, url: item.url });
                                console.log(dropdownPokemon1);
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
                                setDropdownPokemon2({ ...defaultPokemonInfo, name: item.name, url: item.url });
                                console.log(dropdownPokemon2);
                            }}
                            renderItem={item => _renderItem(item)}
                        />
                    </View>
                </View>
                <View style={styles.SelectButtonSection}>
                    <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => { getPokemonInfo(); }}>
                        <Text style={styles.selectButtonText}>Seleccionar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.imagesSection}>
                    <Image style={{ height: 150, width: 150 }} source={{ uri: pokemon1Info.image }} />
                    <Image style={{ height: 150, width: 150 }} source={{ uri: pokemon2Info.image }} />
                </View>
                <View style={styles.nameLifeSection}>
                    <View style={styles.nameLife}>
                        <Text style={styles.pokemonNameText}>{`${dropdownPokemon1.name} ${pokemon1Info.currentLife}/${pokemon1Info.life}`}</Text>
                        <Progress.Bar progress={(pokemon1Info.currentLife / pokemon1Info.life)} width={100} height={16} />
                    </View>
                    <View style={styles.nameLife}>
                        <Text style={styles.pokemonNameText}>{`${dropdownPokemon2.name} ${pokemon2Info.currentLife}/${pokemon2Info.life}`}</Text>
                        <Progress.Bar progress={(pokemon2Info.currentLife / pokemon2Info.life)} width={100} height={16} />
                    </View>
                </View>
                <View style={styles.powersSection}>
                    <View style={styles.pokemonPowerSection}>
                        <View style={styles.rowPowerSection}>
                            <PowerButton powerName={pokemon1Info.powers[0].name} powerLevel={pokemon1Info.powers[0].powerLevel} onPressPower={value => { attact(pokemon1Info, value); }} />
                            <PowerButton powerName={pokemon1Info.powers[1].name} powerLevel={pokemon1Info.powers[1].powerLevel} onPressPower={value => { attact(pokemon1Info, value); }} />
                        </View>
                        <View style={styles.rowPowerSection}>
                            <PowerButton powerName={pokemon1Info.powers[2].name} powerLevel={pokemon1Info.powers[2].powerLevel} onPressPower={value => { attact(pokemon1Info, value); }} />
                            <PowerButton powerName={pokemon1Info.powers[3].name} powerLevel={pokemon1Info.powers[3].powerLevel} onPressPower={value => { attact(pokemon1Info, value); }} />
                        </View>
                    </View>
                    <View style={styles.pokemonPowerSection}>
                        <View style={styles.rowPowerSection}>
                            <PowerButton powerName={pokemon2Info.powers[0].name} powerLevel={pokemon2Info.powers[0].powerLevel} onPressPower={value => { attact(pokemon2Info, value); }} />
                            <PowerButton powerName={pokemon2Info.powers[1].name} powerLevel={pokemon2Info.powers[1].powerLevel} onPressPower={value => { attact(pokemon2Info, value); }} />
                        </View>
                        <View style={styles.rowPowerSection}>
                            <PowerButton powerName={pokemon2Info.powers[2].name} powerLevel={pokemon2Info.powers[2].powerLevel} onPressPower={value => { attact(pokemon2Info, value); }} />
                            <PowerButton powerName={pokemon2Info.powers[3].name} powerLevel={pokemon2Info.powers[3].powerLevel} onPressPower={value => { attact(pokemon2Info, value); }} />
                        </View>
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
        marginHorizontal: 20,
    },
    dropdownLabelText: {
        fontSize: 20,
        color: '#975592',
        fontWeight: 'bold',
    },
    dropdownsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
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
        color: '#975592',
        fontSize: 16,
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
        borderColor: '#975592',
        backgroundColor: '#975592',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    selectButtonText: {
        fontSize: 20,
        color: 'white',
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
