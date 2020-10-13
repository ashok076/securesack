import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import qs from 'qs';
import {Toast} from 'native-base';

import BlockFile from '../block-file/block-file.component'
import {getAllFiles, deleteFile} from '../../configuration/api/api.functions'
import Loader from '../loader/loader.component';

import styles from './file.style';

class File extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      fileList:[],
      isLoader: false
    };
  }

  componentDidMount = () =>{
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getFileList()
    })
  }

getFileList = async ()  => {
  const {access_token} = this.props.userData.userData;
  this.setState({ isLoader: true })
  await getAllFiles(access_token)
  .then(response => {
    this.setState({ fileList: response.data.items, isLoader: false })
  })
  .catch(error => console.log("File list error: ", error ))
}

onDownload = (item) => {}

onEdit = (item) => {}

onDelete = async (item) => {
  this.setState({ isLoader: true })
  const {access_token} = this.props.userData.userData;
  await deleteFile(item.item.id, access_token)
  .then(response => {
    this.showToast('Deleted successfully', 'danger', true)
  this.setState({ isLoader: false })
    this.getFileList()
  }).catch(error => {
    console.log("Error in delete file: ", error)
  })
}

  showToast = (message, type, isButtonText) => {
    Toast.show({
      text: message,
      type: `${type}`,
      position: 'bottom',
      textStyle: styles.toastText,
      buttonText: isButtonText ? 'DISMISS' : 'OK',
      duration: 7000,
    });
  };

  render() {
    const {navigation} = this.props;
    const {fileList, isLoader} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={fileList}
          numColumns={2}
          renderItem={(item, id) => <BlockFile item={item} onInfo={this.onInfo} onDelete={this.onDelete} onEdit={this.onEdit} onDownload={this.onDownload}/>}
        />
        <Loader isLoader={this.state.isLoader} />
      </View>
    );
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(File);
