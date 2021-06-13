import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import ShopNavigator from '../ShopNavigator/ShopNavigator';
import UserInfoScreen from '../../Screens/UserInfo/UserInfo';
import { isIphoneX } from '../../Components/Helpers/Dimensions';
import screens from '../Screens';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const height = isIphoneX ? 60 : 40;

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
        name={screens.ShopNavigator}
        component={ShopNavigator}
        options={{
          tabBarIcon: () => <FontAwesome name="list-ol" size={24} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={screens.UserInfo}
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
