import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-native-paper'
import { Root } from "native-base";

import HeaderButton from '../../components/header-button/header-button.component';
import File from '../../components/file/file.component';
import FileUploadModal from '../../components/file-upload-modal/file-upload-modal.component'

import styles from './file-uploading.style'
class FileUploading extends Component {
  constructor() {
    super();
    this.state = {
        show: false
    };
  }

  render(){
      const {navigation} = this.props;
      const {show} = this.state
      return (
          <Provider>
            <Root>
              <View style={styles.container}>
                <HeaderButton icon="add" title="Upload File" navigation={navigation} iconPress={() => this.setState({ show: true })}/>
                <File navigation={navigation}/>
                <FileUploadModal navigation={navigation} show={show}/>
              </View>
            </Root>
          </Provider>
      )
  }
}

export default FileUploading;