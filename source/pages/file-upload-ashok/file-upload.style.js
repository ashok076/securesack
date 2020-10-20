import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    header: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    buttonView: {
        marginTop: '5%',
        backgroundColor: '#fb9337',
        padding: '5%',
        width: '30%',
        alignSelf: "flex-end",
        borderRadius: 15,
        marginRight: '3%'
    },
    uploadButtonView: {
        padding: '5%',
        width: '30%',
        alignSelf: "flex-end",
        marginLeft: '30%',
        borderRadius: 15,

    },
    tagButtonView: {
        padding: '5%',
        width: '30%',
        alignSelf: "center",
        marginLeft: '10%',
        borderRadius: 10,

    },
    text_Btn_View: {
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    titleView: {
        width: '100%',
        height: 90,
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
    backgroundImage: {
        height: '100%',
        width: '100%',
    },
    Spacing_Input: {
        marginTop: '3%'
    },
    uploadDT: {
        marginTop: '3%',
        marginLeft: '2%',
        flexDirection: 'row'
    },
    container: {
        backgroundColor: 'rgb(243,243,243)',
        borderRadius: 9,
        width: '100%',
        padding: 15,
        marginTop: 24,
        flexDirection: 'row'
    },
    detailView: {
        borderRadius: 9,
        width: '90%',
        marginTop: 24,
        flexDirection: 'row'
    },
    fileView: {
        fontSize: 16,
        marginLeft: 15,
        fontFamily: 'PublicSans-Regular',
        color: 'rgb(33, 47, 60)',
    },
    inputTag: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: '3%',
        marginTop: '3%'
    },
    inputView: {
        width: '50%'
    },
    fileList: {
        flex: 1,
        marginTop: '3%',
        width: '100%'
    },
    centerView: { alignSelf: 'center' },
    tagList: {
        marginLeft: '3%',

    },
    getList: {
        width: '30%',
        alignSelf: 'center'
    },
    flistTags: {
        flexDirection: 'row',
        marginTop: '5%',
        flexDirection: 'row',
        marginLeft: '2%'
    },
    topContainer: {
        flex: 1,
        width: '100%'
    },
    innerView: {
        marginLeft: '2%',
        marginRight: '2%'
    },
    flatListrender: {
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    getCardStyles: {
        width: '45%',
        margin: '2%',
        alignSelf: 'center',
        backgroundColor: 'rgb(243,243,243)',
        padding: 15,
        borderRadius: 15
    },
    cardInner: {
        borderBottomWidth: 1,
        width: '90%'
    },
    cardSize: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardDelete: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default styles;