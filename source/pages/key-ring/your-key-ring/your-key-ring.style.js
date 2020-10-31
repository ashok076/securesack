import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
      marginTop: 20,
      marginLeft: 15,
      marginBottom: 10
  },
  header: { 
      height: 50,
      backgroundColor: '#537791',
        borderWidth: 1,
        borderColor: 'black'
      },
  text: { 
      textAlign: 'center',
      fontFamily: 'PublicSans-Regular',
      },
  row: { 
      height: 40, 
      backgroundColor: '#E7E6E1' 
      },
      headerText: {
          fontFamily: 'PublicSans-SemiBold',
          padding: 15,
          borderWidth: 0.5,
        borderColor: 'black'
      },

  gridSystems: {
    flex: 1
  },
  tableStyle: {
    width: Dimensions.get("screen").width,
    padding: 5
  },
  head: {
    height: 45,
    backgroundColor: "#FFFFFF"
  },
  tableTitle: {
    color: "#FB9337",
    fontFamily: 'PublicSans-SemiBold'
  },
  tableData: {
    height: "auto",
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5
  },
  view: {
      backgroundColor: 'white',
      flex: 1
  },
  tableView: {
      padding: 5
  },
  searchView: {
    marginTop: 20,
    margin: 7
  },
})

export default styles