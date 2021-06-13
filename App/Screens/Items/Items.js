import React, { useState, useCallback } from 'react';
import { View, FlatList, TextInput, Text } from 'react-native';
import _debounce from 'lodash.debounce';

import { usePaginatedFlatListData } from '../../hooks/usePaginatedFlatListData';
import Spinner from '../../Components/Spinner';
import { URL } from '../../Constants/Constants';
import SingleItem from '../../Components/SingleItem/SingleItem';
import styles from './styles';
import screens from '../../Navigation/Screens';

const ItemsScreen = ({ navigation: { navigate } }) => {
  const {
    data: items,
    isLoading,
    isRefreshing,
    isFetchingMore,
    fetchMore,
    refresh,
  } = usePaginatedFlatListData({ url: `${URL}/product` });

  const [maxPrice, setMaxPrice] = useState('');
  const [searchText, setSearchText] = useState('');

  // middle text input state for debouncing and better user experience
  const [debounceMaxPrice, setDebounceMaxPrice] = useState('');
  const [debounceSearchText, setDebounceSearchText] = useState('');

  // debounced text input state setters
  const onMaxPriceChangeSearchDebounce = useCallback(_debounce(setDebounceMaxPrice, 500), [setDebounceMaxPrice]);
  const onTextChangeSearchDebounce = useCallback(_debounce(setDebounceSearchText, 500), [setDebounceSearchText]);

  const {
    data: itemsByName,
    isRefreshing: isRefreshingByName,
    isFetchingMore: isFetchingMoreByName,
    fetchMore: fetchMoreByName,
    refresh: refreshByName,
  } = usePaginatedFlatListData({ url: `${URL}/product/search/${debounceSearchText}`, skipInitialData: true });

  const finalItems = debounceSearchText ? itemsByName : items;
  const filteredItems = debounceMaxPrice
    ? finalItems.filter(({ price }) => price <= Number(debounceMaxPrice))
    : finalItems;

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <>
          <View style={styles.textInputRow}>
            <Text style={styles.itemSmallText}>Max Price</Text>
            <TextInput
              style={styles.textInput}
              value={maxPrice}
              autoCapitalize="none"
              keyboardType="numeric"
              placeholder="Enter desired price limit"
              onChangeText={(e) => {
                onMaxPriceChangeSearchDebounce(e);
                setMaxPrice(e);
              }}
            />
          </View>
          <View style={styles.textInputRow}>
            <Text style={styles.itemSmallText}>Search by Name</Text>
            <TextInput
              style={styles.textInput}
              value={searchText}
              autoCapitalize="none"
              placeholder="Search parameters"
              onChangeText={(e) => {
                onTextChangeSearchDebounce(e);
                setSearchText(e);
              }}
            />
          </View>
          <FlatList
            style={styles.flatList}
            data={filteredItems}
            keyExtractor={(item) => item.key}
            onEndReachedThreshold={0.3}
            onEndReached={searchText ? fetchMoreByName : fetchMore}
            refreshing={searchText ? isRefreshingByName : isRefreshing}
            onRefresh={searchText ? refreshByName : refresh}
            renderItem={({ item }) => (
              <SingleItem item={item} onPress={() => navigate(screens.ItemCard, { id: item.id })} />
            )}
            ListEmptyComponent={<Text>Nothing was found. Try changing filter options</Text>}
            ListFooterComponent={<Spinner isLoading={searchText ? isFetchingMoreByName : isFetchingMore} />}
          />
        </>
      )}
    </View>
  );
};
export default ItemsScreen;
