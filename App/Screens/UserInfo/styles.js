import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    borderRadius: 50,
    width: 200,
    height: 250,
    resizeMode: 'cover',
    margin: 10,
  },
  mainText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  itemSmallText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '300',
  },
});
