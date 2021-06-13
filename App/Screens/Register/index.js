import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Context';

import useMergeState from '../../hooks/useMergeState';
import { URL } from '../../Constants/Constants';

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    width: 300,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
});

const Register = ({ navigation }) => {
  const { data, setData } = useContext(MyContext);

  const [userData, setUserData] = useMergeState({
    firstName: 'string123',
    email: 'stringqweasd124@gmail.com',
    phoneNumber: '+380669699522',
    // full register doesn't work on server, implementing fast register;
    // lastName: 'TestLastName33',
    // password: 'TestMyPassword774',
    // confirmPassword: 'TestMyPassword774',
  });
  const [error, setError] = useState([]);

  const registerUser = async () => {
    const response = await fetch(`${URL}/auth/fast-register`, {
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
        setError(['gavno']);
      }

      setTimeout(() => {
        setError([]);
      }, 5000);
      return;
    }

    // checking for toke to set login status
    if (parsedResponse.token) {
      setData({ isLoggedIn: true, token: parsedResponse.token });

      // setting login status in local storage
      const userStatus = JSON.stringify({ isLoggedIn: true, token: parsedResponse.token });
      AsyncStorage.setItem('userStatus', userStatus);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>
      <TextInput
        style={styles.textInput}
        value={userData.firstName}
        onChangeText={(text) => setUserData({ firstName: text })}
      />
      {/* <TextInput
        style={styles.textInput}
        value={userData.lastName}
        onChangeText={(text) => setUserData({ lastName: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.password}
        onChangeText={(text) => setUserData({ password: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.confirmPassword}
        onChangeText={(text) => setUserData({ confirmPassword: text })}
      /> */}
      <TextInput
        style={styles.textInput}
        value={userData.email}
        onChangeText={(text) => setUserData({ email: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.phoneNumber}
        onChangeText={(text) => setUserData({ phoneNumber: text })}
      />
      <TouchableOpacity onPress={() => registerUser()}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: 300, height: 300 }} onPress={() => setError([])}>
        {error &&
          error.map((err) => {
            if (typeof err !== 'string') return null;
            return <Text key={err}>{err}</Text>;
          })}
      </TouchableOpacity>
    </View>
  );
};
export default Register;
