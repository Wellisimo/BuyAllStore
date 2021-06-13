import React, { useEffect, useContext } from 'react';
import { Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../Components/Button/Button';
import { MyContext } from '../../Context/Context';
import useMergeState from '../../hooks/useMergeState';
import { URL, Avatar } from '../../Constants/Constants';
import styles from './styles';

const UserInfoScreen = () => {
  const { data, setData } = useContext(MyContext);
  const [userInfo, setUserInfo] = useMergeState({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    avatar: '',
    dateOfBirth: '',
  });

  const logOut = async () => {
    const userStatus = JSON.stringify({ isLoggedIn: false, token: '' });
    AsyncStorage.setItem('userStatus', userStatus);
    setData({ isLoggedIn: false, token: '' });
  };

  useEffect(() => {
    fetch(`${URL}/users/profile`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${data.token}`,
      },
    })
      .then((response) => response.json())
      .then((parsedResponse) => {
        setUserInfo({
          id: parsedResponse.id,
          firstName: parsedResponse.firstName,
          lastName: parsedResponse.lastName,
          phoneNumber: parsedResponse.phoneNumber,
          email: parsedResponse.email,
          avatar: parsedResponse.avatar,
          dateOfBirth: parsedResponse.dateOfBirth,
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>User Info</Text>
      <Image
        style={styles.itemImage}
        source={{
          uri: userInfo.avatar ? `${URL}/users/avatar/${userInfo.avatar}` : Avatar,
        }}
      />
      {!!userInfo.id && <Text style={styles.itemSmallText}>ID: {userInfo.id}</Text>}
      {!!userInfo.firstName && <Text style={styles.itemSmallText}>First name: {userInfo.firstName}</Text>}
      {!!userInfo.lastName && <Text style={styles.itemSmallText}>Last name: {userInfo.lastName}</Text>}
      {!!userInfo.phoneNumber && <Text style={styles.itemSmallText}>Phone number: {userInfo.phoneNumber}</Text>}
      {!!userInfo.email && <Text style={styles.itemSmallText}>Email: {userInfo.email}</Text>}
      {!!userInfo.dateOfBirth && <Text style={styles.itemSmallText}>Date of birth: {userInfo.dateOfBirth}</Text>}

      <Button title="Log Out" onPress={() => logOut()} />
    </View>
  );
};

export default UserInfoScreen;
