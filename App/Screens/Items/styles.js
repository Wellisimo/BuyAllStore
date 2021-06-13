import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flatList: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemImage: {
    borderRadius: 50,
    width: 250,
    height: 300,
    resizeMode: 'cover',
  },
  itemText: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRatingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 90,
  },
  itemSmallText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
  },
  itemDescription: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});
