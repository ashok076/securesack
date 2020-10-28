import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    innerContainer: {
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
  outerView: {
    marginTop: 30,
  },
  inputContainer: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'PublicSans-Regular',
    fontSize: 18,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  miniContainer: {
    paddingTop: 1,
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
  },
  miniInputContainer: {
    flex: 1,
  },
})

export default styles