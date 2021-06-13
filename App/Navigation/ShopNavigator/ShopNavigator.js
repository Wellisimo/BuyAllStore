import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ItemsScreen from '../../Screens/Items/Items';
import ItemCard from '../../Screens/ItemCard/ItemCard';

const Shop = createStackNavigator();

const ShopNavigator = () => (
  <Shop.Navigator>
    <Shop.Screen name="ItemsScreen" component={ItemsScreen} options={{ headerShown: false }} />
    <Shop.Screen name="ItemCard" component={ItemCard} options={{ headerShown: false }} />
  </Shop.Navigator>
);

export default ShopNavigator;
