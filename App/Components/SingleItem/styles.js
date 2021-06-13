import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  itemContainer: {
    marginBottom: 35,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 35,
  },
  itemImage: {
    borderRadius: 50,
    width: 250,
    height: 300,
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  previewImage: {
    width: 150,
    height: 250,
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  scrollView: {
    marginVertical: 10,
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
  itemPriceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSmallText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '300',
  },
  itemAvailabilityText: {
    fontSize: 14,
    fontWeight: '300',
    color: 'green',
  },
  itemDescription: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  itemDescriptionContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});
