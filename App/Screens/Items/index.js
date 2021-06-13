import React from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import { decode } from 'html-entities';
import StarRating from 'react-native-star-rating';

import { usePaginatedFlatListData } from '../../hooks/usePaginatedFlatListData';
import Spinner from '../../Components/Spinner';
import { URL } from '../../Constants/Constants';

const regex = /(<([^>]+)>)/gi;

const ItemsScreen = () => {
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
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemImage}
                source={{
                  uri: `${URL}/product/img/${item.mainImg.name}`,
                }}
              />
              <Text style={styles.itemText}>{decode(item.name)}</Text>
              <View style={styles.itemRow}>
                <View style={styles.itemRatingContainer}>
                  <Text style={styles.itemSmallText}>{item.avgRating}</Text>
                  <StarRating
                    disabled
                    maxStars={5}
                    rating={Number(item.avgRating)}
                    starSize={20}
                    halfStarEnabled
                    halfStarColor="orange"
                    fullStarColor="orange"
                  />
                </View>
                <Text style={styles.itemSmallText}>{item.price} грн</Text>
              </View>
              <Text numberOfLines={4} style={styles.itemDescription}>
                {decode(item.description).replace(regex, '')}
              </Text>
            </View>
          )}
          ListFooterComponent={<Spinner isLoading={isFetchingMore} />}
        />
      )}
    </View>
  );
};
export default ItemsScreen;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  flatList: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  itemImage: {
    borderRadius: 50,
    width: 250,
    height: 300,
    resizeMode: 'cover',
  },
  itemText: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRatingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSmallText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
  },
  itemDescription: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});
