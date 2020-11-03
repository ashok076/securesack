import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
  },
  contentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  title: {
    fontFamily: 'PublicSans-Regular',
    fontSize: 18,
  },
  caption: {
    fontFamily: 'PublicSans-ExtraLight',
    fontSize: 16,
    marginLeft: 20,
  },
  outerView: {
    marginTop: 30,
  },
  alignHor: {
    flexDirection: 'row',
  },
  iconView: {
      marginRight: 15
  }
});

export default styles;
