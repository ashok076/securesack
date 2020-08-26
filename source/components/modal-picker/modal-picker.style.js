import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 9,
    height: 60,
    width: '100%',
    backgroundColor: 'rgba(33, 47, 60, 0.1)',
    padding: 15,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  label: {
    fontSize: 15,
    color: 'rgb(33, 47, 60)',
    fontFamily: 'PublicSans-Regular',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
});

export default styles;
