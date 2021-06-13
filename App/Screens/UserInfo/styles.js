import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 50,
  },
  itemImage: {
    borderRadius: 50,
    width: 250,
    height: 300,
    resizeMode: 'cover',
    margin: 30,
  },
  mainText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  itemSmallText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
  },
});
