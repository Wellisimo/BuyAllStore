import React, { useEffect, useState, useRef } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import { decode } from 'html-entities';
import StarRating from 'react-native-star-rating';
import { usePaginatedFlatListData } from './hook';
import Spinner from '../../Components/Spinner';

const URL = 'https://api.shop.waf.com.ua/product';
const pageLimit = 5;
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
  console.log(items.length);
  // const page = useRef(1);
  // const [items, setItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  // const [isFetchingMore, setIsFetchingMore] = useState(false);

  // const loadData = async (refresh) => {
  //   setIsRefreshing(true);
  //   const newData = await fetch(`${URL}?page=${page.current}&limit=${pageLimit}`);
  //   const jsonNewData = await newData.json();
  //   console.log({ isRefreshing });
  //   setItems((prev) => {
  //     console.log({ isRefreshing, tt: [...(!isRefreshing && prev), ...jsonNewData], bb: '1231321321' });
  //     return [...jsonNewData];
  //   });
  //   setIsLoading(false);
  //   setIsRefreshing(false);
  //   setIsFetchingMore(false);
  // };

  // const goNextPage = async () => {
  //   if (isFetchingMore) return;
  //   setIsFetchingMore(true);
  //   page.current += 1;
  //   loadData();
  // };

  // const refreshList = () => {
  //   page.current = 1;
  //   loadData();
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <View style={styles.listContainer}>
      {console.log('render')}
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
            console.log('endReached');
            fetchMore();
          }}
          refreshing={isRefreshing}
          onRefresh={refresh}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Image
                style={styles.itemImage}
                source={{
                  uri: `${URL}/img/${item.mainImg.name}`,
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
    // width: "100%",
    // paddingLeft: "10%",
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
    // flex: 1,
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
