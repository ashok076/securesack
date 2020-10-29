import React, {Component} from 'react';
import {View, Modal, TouchableOpacity, Text, FlatList, ToastAndroid} from 'react-native';
import {Toast, Root} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Chip} from 'react-native-paper';
import qs from 'qs';

import {
  addTag,
  uploadFile,
  getAllFiles,
  updateTagImage,
} from '../../configuration/api/api.functions';
import Button from '../../components/button/button.component'
import InputTextDynamic from '../../components/input-text-dynamic/input-text-dynamic.component';
import {Color} from '../../assets/color/color';

import FileSelected from '../file-selected/file-selected.component'

import styles from './file-upload-modal.style';

class FileUploadModal extends Component {
    initialState = {
        fileList: '',
        countList: '',
        fileListData: [],
        uploadFileData: null,
        tagList: [],
        tagCat: ''
    }
    constructor(){
        super()
        this.state = {
            ...this.initialState
        }
    }

componentDidMount(){
    const {navigation} = this.props;
        this.setState(this.initialState)
}

  uploadFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      const data = results[0].name
      this.setState({
        fileList: results[0].name,
        countList: this.state.countList + 1,
      });
      var filedata = {
        doc: results[0].name,
        id: this.state.countList,
      };
      this.state.fileListData.push(filedata);
      this.uploadFileApi(data);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  uploadFileApi = async (data) => {
    this.setState({isLoader: true});
    const {access_token} = this.props;
    console.log("Responseing: ", access_token)
    try {
      await uploadFile(access_token, data)
        .then((response) => {
          console.log("Response: ", response)
          if (response.success) {
            this.setState({
              fileid: response.details.id,
              isLoader: false,
              isOpen: true,
              uploadDT: response.details.uploadDtm,
              fileSize: response.details.size,
            });
            this.showToast('File uploaded successfully')
          } else {
            this.showToast('File uploading failed')
          }
        })
        .catch((error) => {
          console.log('Error: ', error);
          this.setState({isLoader: false});
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  updateTags = async (item) => {
    this.setState({isLoader: true});
    const {access_token} = this.props;
    const fileid = this.state.fileid;
    let updateTagsList = [];
    updateTagsList.push(item.item);

    const data = qs.stringify({
      tags: `${updateTagsList}`,
    });
  }

  addTags = async () => {
    console.log("Add",this.state.tagCat.length)
    this.setState({isLoader: true});
    const {access_token} = this.props;
    const tags = qs.stringify({tag: this.state.tagCat})
    if (this.state.tagCat.length > 0) {
      try {
        await addTag(access_token, tags)
          .then((response) => {
            console.log("Res: ", response)
            if (response.status === 'Success') {
              this.showToast('Tag added  successfully')
              this.state.tagList.push(this.state.tagCat);
              this.setState({isLoader: false, tagCat: ''});
            } else {
            this.showToast('Failed')
            this.setState({isLoader: false});
            }
          })
          .catch((error) => {
        this.showToast('Something went wrong')
            this.setState({isLoader: false});
            console.log("Error: ", error)
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.showToast('Please fill the Input text')
    }
  };

  renderUploaTags = (item) => (
      <View style={styles.tagList}>
        <Chip onPress={() => this.updateTags(item)}>{item.item}</Chip>
      </View>
    );
  

  closeModal = () => {
    const {changeModalVisibility} = this.props;
    changeModalVisibility(false);
    this.props.refereshList();
  };

listEmptyView = () => (
  <View style={styles.buttonContainer}>
      <Button onPress={() => this.uploadFile()} title="Upload File" />
  </View>
)

listFilledView = (fileListData) => (
  <View>
    <FileSelected fileList={fileListData}/>
    <Text style={styles.fileView}>Tags</Text>
            <View style={styles.flistTags}>
              <FlatList
                data={this.state.tagList}
                numColumns={5}
                renderItem={(item, id) => this.renderUploaTags(item)}
              />
            </View>
              <View style={styles.row}>
                <View style={{width: '90%', padding: 10}}>
                  <InputTextDynamic
                  value={this.state.tagCat}
                  onChangeText={(tagCat) => {
                    this.setState({tagCat});
                  }}
                  placeholder="Add Tag"
                  color={Color.orange}
                />
                </View>
                <TouchableOpacity onPress={() => this.addTags()} style={{alignItems: 'center', justifyContent: 'center'}}>
                  <SimpleLineIcons name="plus" size={24}/>
                </TouchableOpacity>
        </View>
      </View>
)

    render(){
        const {show} = this.props;
        const {fileListData} = this.state;
        return (
            <Modal
                transparent={false}
                animationType={'fade'}
                visible={show}>
                <View>
                <TouchableOpacity style={styles.closeModal} onPress={() => this.closeModal()}>
                  <Icons name="close" color="#000000" size={25} />
                </TouchableOpacity>
                {fileListData.length === 0 ? 
                  this.listEmptyView() : 
                  this.listFilledView(fileListData)
                  }
                </View>
              </Modal>
        )
    }
}

export default FileUploadModal;