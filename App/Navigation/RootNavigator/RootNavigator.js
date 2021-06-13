import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from '../AuthNavigator/AuthNavigator';
import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator';
import { MyContext } from '../../Context/Context';
import screens from '../Screens';

const Root = createStackNavigator();

const RootNavigator = () => {
  const {
    data: { isLoggedIn },
  } = useContext(MyContext);

  return (
    <NavigationContainer>
      <Root.Navigator>
        {isLoggedIn ? (
          <Root.Screen
            name={screens.BottomTabNavigator}
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Root.Screen name={screens.AuthNavigator} component={AuthNavigator} options={{ headerShown: false }} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
