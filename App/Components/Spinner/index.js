import React from 'react';
import { ActivityIndicator } from "react-native";

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return <ActivityIndicator size="large" color="black" />;
};

export default Spinner;
