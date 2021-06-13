import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  buttonAbsolute: {
    width: 200,
    height: 50,
    borderColor: 'grey',
    backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  buttonRelative: {
    width: 200,
    height: 50,
    borderColor: 'grey',
    backgroundColor: 'grey',
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  buttonText: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
});

const Button = ({ title, onPress, absolute }) => {
  const buttonStyle = absolute ? styles.buttonAbsolute : styles.buttonRelative;
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
