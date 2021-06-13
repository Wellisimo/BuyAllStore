import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import ItemsScreen from '../../Screens/Items';
import UserInfoScreen from '../../Screens/UserInfo';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    backBehavior="none"
    tabBarOptions={{
      inactiveBackgroundColor: 'green',
      safeAreaInsets: {
        bottom: 0,
      },
    }}>
    <Tab.Screen
      name="ItemsScreen"
      component={ItemsScreen}
      options={{
        tabBarIcon: () => <FontAwesome name="list-ol" size={24} />,
        tabBarLabel: () => null,
      }}
    />
    <Tab.Screen
      name="UserInfoScreen"
      component={UserInfoScreen}
      options={{
        tabBarIcon: () => <AntDesign name="user" size={24} />,
        tabBarLabel: () => null,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
