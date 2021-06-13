import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/Login';
import Register from '../../Screens/Register';

const Auth = createStackNavigator();

const AuthNavigator = () => (
  <Auth.Navigator>
    <Auth.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

    <Auth.Screen name="Register" component={Register} options={{ headerShown: false }} />
  </Auth.Navigator>
);

export default AuthNavigator;
