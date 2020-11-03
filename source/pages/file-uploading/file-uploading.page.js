import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-native-paper';
import {connect} from 'react-redux';
import { Root } from "native-base";

import HeaderButton from '../../components/header-button/header-button.component';
import File from '../../components/file/file.component';
import {getAllFiles} from '../../configuration/api/api.functions'
import FileUploadModal from '../../components/file-upload-modal/file-upload-modal.component'
import Loader from '../../components/loader/loader.component';

import styles from './file-uploading.style'
class FileUploading extends Component {
  initialState = {
    show: false,
    isLoader: false,
    fileList: [],
    access_token: '',
    edit: false,
    data: ''
  }
  constructor() {
    super();
    this.state = {
        ...this.initialState
    };
  }

  componentDidMount = () =>{
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getFileList()
      this.setState(this.initialState)
    })
  }

  getFileList = async ()  => {
  const {access_token} = this.props.userData.userData;
  this.setState({ isLoader: true, access_token: access_token })
  await getAllFiles(access_token)
  .then(response => {
    this.setState({ fileList: response.data.items, isLoader: false })
  })
  .catch(error => console.log("File list error: ", error ))
}

  changeModalVisibility = (bool) => {
    this.setState({ show: bool })
  }

  changeVisibility = (bool, item) => {
    this.setState({ show: bool, edit: bool, data: item }, () => console.log("Edit: ", this.state.edit))
  }

  changeEdit = (bool) => {
    this.setState({ edit: bool })
  }

  render(){
      const {navigation} = this.props;
      const {show,access_token, fileList, edit, data} = this.state
      console.log("accesss ", this.props.userData.userData.access_token )
      return (
          <Provider> 
            <Root>
              <View style={styles.container}>
                <HeaderButton icon="add" title="Upload File" navigation={navigation} iconPress={() => this.setState({ show: true })}/>
                <File navigation={navigation} getFileList={this.getFileList} access_token={this.props.userData.userData.access_token} fileList={fileList} changeVisibility={this.changeVisibility} />
                <FileUploadModal navigation={navigation} show={show} changeModalVisibility={this.changeModalVisibility} refereshList={this.getFileList} access_token={this.props.userData.userData.access_token} edit={edit}
                data={data } changeEdit={this.changeEdit}/>
                <Loader isLoader={this.state.isLoader} />
              </View>
            </Root>
          </Provider>
      )
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(FileUploading);