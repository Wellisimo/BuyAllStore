import { Platform, Dimensions } from 'react-native';

export const Screen = () => {
  const IsIOS = () => Platform.OS === 'ios';
  const HasNotch = () => Dimensions.get('screen').height >= 812;
  return { HasNotch, IsIOS };
};
