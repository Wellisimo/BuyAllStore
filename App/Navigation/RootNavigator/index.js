import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from '../AuthNavigator';
import BottomTabNavigator from '../BottomTabNavigator';

const Root = createStackNavigator();

const RootNavigator = () => {
    const isUserLogged = true;

    return (
        <NavigationContainer>
            <Root.Navigator>
                {!isUserLogged
                    ? <Root.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
                    : <Root.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />}
            </Root.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;