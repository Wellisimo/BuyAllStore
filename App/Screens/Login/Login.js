import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../../Context/Context';

import Button from '../../Components/Button/Button';
import useMergeState from '../../hooks/useMergeState';
import { URL } from '../../Constants/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 35,
    width: 300,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  mainText: {
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  text: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '300',
  },
  messageContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  messageText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
    color: 'grey',
  },
});

const Login = ({ navigation }) => {
  const { setData } = useContext(MyContext);

  const [userData, setUserData] = useMergeState({
    email: '', //  stringqweasd124@gmail.com
    password: '', //  TestMyPassword774
  });
  const [error, setError] = useState([]);

  const loginUser = async () => {
    const response = await fetch(`${URL}/auth/login`, {
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
      <Text style={styles.mainText}>Enter Login Data</Text>
      <TextInput
        style={styles.textInput}
        value={userData.email}
        placeholder="Email"
        onChangeText={(text) => setUserData({ email: text })}
      />
      <TextInput
        style={styles.textInput}
        value={userData.password}
        placeholder="Password"
        onChangeText={(text) => setUserData({ password: text })}
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
      <Button title="Login" onPress={() => loginUser()} />
      <Text style={styles.text} onPress={() => navigation.navigate('Register')}>
        Have no account? Go to Register page
      </Text>
    </View>
  );
};
export default Login;
