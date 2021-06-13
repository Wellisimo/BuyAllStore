import { Platform, Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const IPHONE_X_HEIGHT = 812;

export const isAndroid = () => Platform.OS === 'android';

export const isIOS = () => Platform.OS === 'ios';

export const isAndroidPlatform = isAndroid();

export const isIOSPlatform = isIOS();

export const isIphoneX = () => isIOS() && SCREEN_HEIGHT >= IPHONE_X_HEIGHT;
