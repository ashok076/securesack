import { StyleSheet,StatusBar } from 'react-native';

const styles = StyleSheet.create({
    root_container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
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
        color: '#000000',
        marginLeft: 15
    },
    rowObject: {
        flexDirection: 'row',
          alignItems: 'center',
      },
    outerView: {
        backgroundColor: '#FFFFFF',
        paddingTop: StatusBar.HEIGHT,
        flex: 1,
      },
    header: {
        alignSelf: 'flex-start',
        marginTop:'5%'
    },
    body:{
        backgroundColor:'#ffffff'
    },
    header_Sub: {
        marginTop: '15%',
        alignSelf: 'flex-start',
    },
    headerText: {
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'PublicSans-Regular',
        color: 'rgb(33, 47, 60)',
        fontWeight:'bold',
      },
      header_text_Sub:{
        fontSize: 12,
        marginLeft: 15,
        fontFamily: 'PublicSans-Regular',
        color: 'rgb(33, 47, 60)',
      },
    header_text_1:{ fontWeight: 'bold', color: '#6b6b6b', fontSize: 25 },
    Spacing_Input: {
        marginTop: '3%'
    },
    buttonView: {
        marginTop: '5%',
        backgroundColor: '#fb9337',
        padding: '5%',
        width: '50%',
        alignSelf: 'center',
        borderRadius: 15
    },
    buttonView_Email: {
        marginTop: '5%',
        backgroundColor: '#fb9337',
        padding: '5%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom:'2%'
    },
    text_Btn_View: {
        alignSelf: 'center',
        color:'#ffffff',
        fontSize:17,
        fontWeight:'bold'
    },


})

export default styles;