import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MyContext } from './App/Context/Context';
import useMergeState from './App/hooks/useMergeState';
import RootNavigator from './App/Navigation/RootNavigator/RootNavigator';

const App = () => {
  const [data, setData] = useMergeState({ isLoggedIn: false, token: '' });

  // loading user info from local storage
  useEffect(() => {
    (async () => {
      const userStatus = await AsyncStorage.getItem('userStatus');
      const parsedUserStatus = userStatus && JSON.parse(userStatus);
      if (parsedUserStatus) {
        setData({ isLoggedIn: parsedUserStatus.isLoggedIn, token: parsedUserStatus.token });
      }
    })();
  }, []);

  return (
    <MyContext.Provider value={{ data, setData }}>
      <StatusBar barStyle={'default'} />
      <RootNavigator />
    </MyContext.Provider>
  );
};

export default App;
