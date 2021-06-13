import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ItemsScreen from '../../Screens/Items/Items';
import ItemCard from '../../Screens/ItemCard/ItemCard';

const Shop = createStackNavigator();

const ShopNavigator = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Shop.Navigator>
      <Shop.Screen name="ItemsScreen" component={ItemsScreen} options={{ headerShown: false }} />
      <Shop.Screen name="ItemCard" component={ItemCard} options={{ headerShown: false }} />
    </Shop.Navigator>
  </SafeAreaView>
);

export default ShopNavigator;
