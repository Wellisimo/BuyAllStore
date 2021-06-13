import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Spinner from '../../Components/Spinner';
import { URL } from '../../Constants/Constants';
import SingleItem from '../../Components/SingleItem/SingleItem';
import Button from '../../Components/Button/Button';
import styles from './styles';

const ItemCard = ({ route: { params } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState({});

  const getItemData = async () => {
    const newData = await fetch(`${URL}/product/${params.id}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    });
    const jsonNewData = await newData.json();
    // console.log(jsonNewData);
    setItem(jsonNewData);
    setIsLoading(false);
  };

  useEffect(() => {
    getItemData();
  }, []);

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <View style={styles.itemContainer}>
          <SingleItem item={item} singleItem />
          <Button title="Купити" absolute />
        </View>
      )}
    </View>
  );
};
export default ItemCard;
