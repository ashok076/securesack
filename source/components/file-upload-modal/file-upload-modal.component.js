import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import styles from './file-upload-modal.style';

class FileUploadModal extends Component {
    initialState = {
        fileList: '',
        countList: '',
        fileListData: [],
        uploadFileData: null
    }
    constructor(){
        super()
        this.state = {
            ...this.initialState
        }
    }

componentDidMount(){
    const {navigation, show} = this.props;
    navigation.addListener('focus', () => {
        this.setState(this.initialState)
        if (show) this.uploadFile()
    });
}

  uploadFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      const data = {
        filename: results[0].name,
        filetype: results[0].type,
      };
      this.setState({
        fileList: results[0].name,
        countList: this.state.countList + 1,
      });
      var filedata = {
        doc: results[0].name,
        id: this.state.countList,
      };
      this.state.fileListData.push(filedata);
      this.setState({ uploadFileData: data });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

    render(){
        const {show} = this.state;
        return (
            <Modal
                transparent={true}
                animationType={'fade'}
                visible={show}>

                </Modal>
        )
    }
}

export default FileUploadModal;