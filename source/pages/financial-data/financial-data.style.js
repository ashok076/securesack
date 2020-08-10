import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#FFFFFF',
    paddingTop: StatusBar.HEIGHT,
    flex: 1,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  outerContainerView: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  titleView: {
      width: '100%',
      height: 100,
  }
});
export default styles;
