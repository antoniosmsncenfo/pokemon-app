import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PowerButton } from './PowerButton';

interface Props {
    pokemonPowers: [{
        name: string;
        value: number;
        onPressPower: ((powerValue: number) => void);
    }]
}

export const renderPowerButtonSection = ({pokemonPowers}: Props) => {
    return (
        <View style={styles.pokemonPowerSection}>
            <View style={styles.rowPowerSection}>
                <PowerButton powerName={pokemonPowers[0].name} powerLevel={pokemonPowers[0].value} onPressPower={() => pokemonPowers[0].onPressPower(pokemonPowers[0].value)} />
                <PowerButton powerName={pokemonPowers[0].name} powerLevel={pokemonPowers[0].value} onPressPower={() => pokemonPowers[0].onPressPower(pokemonPowers[0].value)} />
            </View>
            <View style={styles.rowPowerSection}>
                <PowerButton powerName={pokemonPowers[0].name} powerLevel={pokemonPowers[0].value} onPressPower={() => pokemonPowers[0].onPressPower(pokemonPowers[0].value)} />
                <PowerButton powerName={pokemonPowers[0].name} powerLevel={pokemonPowers[0].value} onPressPower={() => pokemonPowers[0].onPressPower(pokemonPowers[0].value)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pokemonPowerSection: {
        justifyContent: 'space-around',
    },
    rowPowerSection: {
        flexDirection: 'row',
    },
});
