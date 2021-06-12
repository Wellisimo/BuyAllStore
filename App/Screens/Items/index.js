import React, { useLayoutEffect, useState } from "react";
import { Text, View, FlatList, Image } from "react-native";

const URL = "https://api.shop.waf.com.ua/product?";

const ItemsScreen = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const loadMoreData = () => {
    setPage((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    (async () => {
      const newData = await fetch(`${URL}page=${page}&limit=10`);
      const jsonNewData = await newData.json();
      console.log(jsonNewData);
      setItems((prev) => [...prev, ...jsonNewData]);
    })();
  }, [page]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ItemsScreen</Text>
      <FlatList
        removeClippedSubviews={false}
        data={items}
        keyExtractor={(item) => item.key}
        onEndReachedThreshold={0.3}
        onEndReached={loadMoreData}
        renderItem={({ item }) => (
          <Image
            style={{ width: 300, height: 300, resizeMode: "contain" }}
            source={{
              uri: `https://api.shop.waf.com.ua/product/img/${item.mainImg.name}`,
            }}
          />
        )}
      />
    </View>
  );
};
export default ItemsScreen;
