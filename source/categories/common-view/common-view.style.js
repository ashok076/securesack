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
    marginLeft: 15,
  },
  rowObject: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default styles;
