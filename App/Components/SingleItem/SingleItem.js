import React from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import { decode } from 'html-entities';
import StarRating from 'react-native-star-rating';

import { URL, regex } from '../../Constants/Constants';
import styles from './styles';

const SingleItem = ({ item, onPress, singleItem }) => (
  <View style={styles.itemContainer}>
    {singleItem ? (
      <FlatList
        horizontal
        style={styles.scrollView}
        data={item.files}
        keyExtractor={(image) => image.id.toString()}
        renderItem={({ item: image }) => (
          <Image
            style={styles.previewImage}
            source={{
              uri: `${URL}${image.url}`,
            }}
          />
        )}
      />
    ) : (
      <Image
        style={styles.itemImage}
        source={{
          uri: `${URL}${item.mainImg.url}`,
        }}
      />
    )}
    <Text style={styles.itemText} onPress={onPress}>
      {decode(item.name)}
    </Text>
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
      <View style={styles.itemPriceContainer}>
        <Text style={styles.itemSmallText}>{item.price} грн</Text>
        <Text style={styles.itemAvailabilityText}>{item.availability && 'В наявності'}</Text>
      </View>
    </View>
    <ScrollView style={styles.itemDescriptionContainer}>
      <Text style={styles.itemDescription} numberOfLines={singleItem ? null : 4}>
        {decode(item.description).replace(regex, '')}
      </Text>
    </ScrollView>
  </View>
);

export default SingleItem;
