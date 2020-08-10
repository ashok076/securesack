import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(243,243,243)',
    borderRadius: 9,
    width: '100%',
    padding: 15,
    marginTop: 24,
  },
  titleIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginLeft: 15,
    fontFamily: 'PublicSans-Regular',
    color: 'rgb(33, 47, 60)'
  },
  addView: {
      position: 'absolute',
      right: 0
  }
});

export default styles;
