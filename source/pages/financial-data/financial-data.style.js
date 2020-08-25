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
  },
  titleView: {
      width: '100%',
      height: 100,
      justifyContent: 'center',
      padding: 15,
  },
  title: {
      fontFamily: 'PublicSans-Bold',
      fontSize: 20,
      color: '#FFFFFF',
      marginLeft: 15
  },
  rowObject: {
    flexDirection: 'row',
      alignItems: 'center',
  }
});
export default styles;
