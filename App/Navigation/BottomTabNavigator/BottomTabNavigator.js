import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import ShopNavigator from '../ShopNavigator/ShopNavigator';
import UserInfoScreen from '../../Screens/UserInfo/UserInfo';
import { Screen } from '../../Components/Helpers/Dimensions';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  let height = 40;

  if (Screen().HasNotch() && Screen().IsIOS()) {
    height += 30;
  } else if (Screen().IsIOS()) {
    height += 10;
  }

  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        inactiveBackgroundColor: 'green',
        style: { height },
        safeAreaInsets: {
          bottom: 0,
        },
      }}>
      <Tab.Screen
        name="ShopNavigator"
        component={ShopNavigator}
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
};

export default BottomTabNavigator;
