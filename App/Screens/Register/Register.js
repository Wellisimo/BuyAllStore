import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Context';

import Button from '../../Components/Button/Button';
import useMergeState from '../../hooks/useMergeState';
import { URL } from '../../Constants/Constants';
import screens from '../../Navigation/Screens';
import styles from './styles';

const Register = ({ navigation }) => {
  const { setData } = useContext(MyContext);

  const [userData, setUserData] = useMergeState({
    firstName: 'string123', //  string123
    email: 'stringqweasd123@gmail.com', //  stringqweasd123@gmail.com
    phoneNumber: '+380669699522', //  +380669699522
    lastName: 'TestLastName33', //  TestLastName33
    password: 'TestMyPassword774', //  TestMyPassword774
    confirmPassword: 'TestMyPassword774', //  TestMyPassword774
  });
  const [error, setError] = useState([]);

  const registerUser = async () => {
    const response = await fetch(`${URL}/auth/register`, {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const parsedResponse = await response.json();

    // checking for status to generate message
    if (!response.ok) {
      if (Array.isArray(parsedResponse.message)) {
        setError(parsedResponse.message);
      } else if (typeof parsedResponse.message === 'string') {
        setError([parsedResponse.message]);
      } else {
        setError(['oh shit']);
      }

      setTimeout(() => {
        setError([]);
      }, 5000);
      return;
    }

    // checking for token to set login status
    if (parsedResponse.token) {
      setData({ isLoggedIn: true, token: parsedResponse.token });

      // setting login status in local storage
      const userStatus = JSON.stringify({ isLoggedIn: true, token: parsedResponse.token });
      AsyncStorage.setItem('userStatus', userStatus);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Enter Your Information</Text>
      <TextInput
        style={styles.textInput}
        value={userData.firstName}
        placeholder="First Name"
        onChangeText={(text) => setUserData({ firstName: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.lastName}
        placeholder="Last Name"
        onChangeText={(text) => setUserData({ lastName: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.password}
        placeholder="Password"
        onChangeText={(text) => setUserData({ password: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.confirmPassword}
        placeholder="Confirm Password"
        onChangeText={(text) => setUserData({ confirmPassword: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.email}
        placeholder="Email"
        onChangeText={(text) => setUserData({ email: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.phoneNumber}
        placeholder="Phone Number"
        onChangeText={(text) => setUserData({ phoneNumber: text })}
      />

      <TouchableOpacity style={styles.messageContainer} onPress={() => setError([])}>
        {error &&
          error.map((err) => {
            if (typeof err !== 'string') return null;
            return (
              <Text style={styles.messageText} key={err}>
                {err}
              </Text>
            );
          })}
      </TouchableOpacity>
      <Button title="Register" onPress={() => registerUser()} />
      <Text style={styles.text} onPress={() => navigation.navigate(screens.Login)}>
        Already registered? Go to Login page
      </Text>
    </View>
  );
};
export default Register;
