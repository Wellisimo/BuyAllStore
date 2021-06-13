import React from 'react';
import { View, FlatList, TextInput } from 'react-native';

import { usePaginatedFlatListData } from '../../hooks/usePaginatedFlatListData';
import Spinner from '../../Components/Spinner';
import { URL } from '../../Constants/Constants';
import SingleItem from '../../Components/SingleItem/SingleItem';
import styles from './styles';

const ItemsScreen = ({ navigation: { navigate } }) => {
  const {
    data: items,
    isLoading,
    isRefreshing,
    isFetchingMore,
    fetchMore,
    refresh,
  } = usePaginatedFlatListData({ url: URL });

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <FlatList
          style={styles.flatList}
          removeClippedSubviews={false}
          data={items}
          keyExtractor={(item) => item.key}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            fetchMore();
          }}
          refreshing={isRefreshing}
          onRefresh={refresh}
          renderItem={({ item }) => <SingleItem item={item} onPress={() => navigate('ItemCard', { id: item.id })} />}
          ListFooterComponent={<Spinner isLoading={isFetchingMore} />}
        />
      )}
    </View>
  );
};
export default ItemsScreen;
