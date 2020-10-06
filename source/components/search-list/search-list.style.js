import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    margin: 5,
    width: width / 1.2,
  },
  cardView: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
  },
  searchImage: {
    height: width / 2,
    width: height / 2,
  },
  noSearchView: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default styles;
