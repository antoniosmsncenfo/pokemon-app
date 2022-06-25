import React from 'react';
import { View, Text } from 'react-native';
import Dropdown from '../components/DropdownComponent';

export const MainScreen = () => {
    return (
        <View><Text>Main screen</Text>
            <Dropdown label="data" />
        </View>
    );
};
