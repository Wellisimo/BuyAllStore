import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../Screens/Login/Login';
import Register from '../../Screens/Register/Register';

const Auth = createStackNavigator();

const AuthNavigator = () => (
  <Auth.Navigator>
    <Auth.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <Auth.Screen name="Register" component={Register} options={{ headerShown: false }} />
  </Auth.Navigator>
);

export default AuthNavigator;
