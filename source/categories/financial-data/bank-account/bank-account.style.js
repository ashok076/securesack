import {StyleSheet, StatusBar} from 'react-native';

const styles = {
  container: {
    padding: 15,
    paddingTop: 30,
  },
  title: {
    fontFamily: 'PublicSans-Regular',
    fontSize: 20,
    color: 'rgb(33, 47, 60)',
  },
  inputContainer: {},
  miniContainer: {
    paddingTop: 1,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
  },
  miniInputContainer: {
    flex: 1,
  },
  gap: {
    marginTop: 50,
  },
  outerView: {
    backgroundColor: 'rgb(248, 249, 250)',
    paddingTop: StatusBar.HEIGHT,
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
};

export default styles;
