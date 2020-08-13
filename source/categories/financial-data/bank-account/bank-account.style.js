import {StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: 'rgb(248, 249, 250)',
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
    backgroundColor: 'rgb(248, 249, 250)',
  },
  titleView: {
      width: '100%',
      height: 100,
      justifyContent: 'center',
      padding: 15
  },
  title: {
      fontFamily: 'PublicSans-Bold',
      fontSize: 20,
      color: '#FFFFFF'
  },
  
});
export default styles;
