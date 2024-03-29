import React, { useState, useEffect } from 'react';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
//Test
import ListScreen from './ListScreen';

const Drawer = createDrawerNavigator();

function AppStackNavigator({ isAdmin }) {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 5 },
                }}>
                <Drawer.Screen
                    name="ListScreen"
                    options={{ drawerLabel: 'ListScreen' }}
                    component={ListScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default AppStackNavigator;
