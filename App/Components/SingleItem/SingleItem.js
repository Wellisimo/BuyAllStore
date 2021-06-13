import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { decode } from 'html-entities';
import StarRating from 'react-native-star-rating';
import Carousel from 'react-native-snap-carousel';

import { URL, regex } from '../../Constants/Constants';
import styles from './styles';

const SingleItem = ({ item, onPress, singleItem }) => (
  <View style={styles.itemContainer}>
    {singleItem ? (
      // <Carousel
      //   sliderWidth={300}
      //   itemWidth={200}
      //   itemHeight={300}
      //   data={item.files}
      //   renderItem={(elem) => (
      //     <Image
      //       style={styles.previewImage}
      //       key={elem.id}
      //       source={{
      //         uri: `${URL}/product/img/${elem.name}`,
      //       }}
      //     />
      //   )}
      // />
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        {item.files.map((elem) => (
          <Image
            style={styles.previewImage}
            key={elem.id}
            source={{
              uri: `${URL}/product/img/${elem.name}`,
            }}
          />
        ))}
      </ScrollView>
    ) : (
      <Image
        style={styles.itemImage}
        source={{
          uri: `${URL}/product/img/${item.mainImg.name}`,
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
