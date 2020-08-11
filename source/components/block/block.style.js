import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: width / 2.5,
    height: height / 4.5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    position: 'absolute',
    bottom: 30,
    left: 10,
    fontSize: 18,
    textAlign: 'left',
    fontFamily: 'PublicSans-SemiBold',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageStyle: {
    borderRadius: 19
  },
  container: {
    padding: 10
  }
});

export default styles;
