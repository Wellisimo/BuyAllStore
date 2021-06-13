import React from 'react';
import { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MyContext } from '../../Context/Context';

const LoginScreen = ({ navigation }) => {
  const { data, setData } = useContext(MyContext);
  const login = async () => {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>LoginScreen</Text>
      <TouchableOpacity
        onPress={() => {
          // setData({ isLoggedIn: true });
          navigation.push('Register');
        }}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
