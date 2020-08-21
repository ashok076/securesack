import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: 'PublicSans-SemiBold',
    color: 'rgb(33, 47, 60)',
    
  },
  label: {
    fontSize: 16,
    fontFamily: 'PublicSans-Regular',
    color: 'rgb(33, 47, 60)',
    textAlign: 'center'
  },
  modal: {
    height: height / 2,
    width: width / 1.3,
    backgroundColor: 'white',
    borderRadius: 9,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  titleView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeView: {
    marginBottom: 10,
  },
  labelView: {
    borderBottomWidth :0.5,
    borderBottomColor: 'rgb(33, 47, 60)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10
  },
  close: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    fontSize: 18,
    fontFamily: 'PublicSans-SemiBold',
    color: 'rgb(33, 47, 60)',
  }
});
export default styles;
