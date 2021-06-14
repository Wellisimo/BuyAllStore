import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  messageText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '300',
    color: 'grey',
  },
});
