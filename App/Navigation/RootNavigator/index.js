import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from '../AuthNavigator';
import BottomTabNavigator from '../BottomTabNavigator';
import { MyContext } from '../../Context/Context';

const Root = createStackNavigator();

const RootNavigator = () => {
  const {
    data: { isLoggedIn },
  } = useContext(MyContext);

  return (
    <NavigationContainer>
      <Root.Navigator>
        {isLoggedIn ? (
          <Root.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{ headerShown: false }} />
        ) : (
          <Root.Screen name="AuthNavigator" component={AuthNavigator} options={{ headerShown: false }} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
