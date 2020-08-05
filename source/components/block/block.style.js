import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    width: 164,
    height: 144,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
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
  }
});

export default styles;
