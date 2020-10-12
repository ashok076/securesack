import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Title} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DocumentPicker from 'react-native-document-picker';
import {Chip} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../../components/input-text-dynamic/input-text-dynamic.component';
import Button from '../../components/button/button.component';
import {
  addTag,
  uploadFile,
  getAllCard,
  updateTagImage,
  deleteCardDetail,
} from '../../configuration/api/api.functions';
import Header from '../../components/header/header.component';
import {Color} from '../../assets/color/color';
import Loader from '../../components/loader/loader.component';

import styles from './file-upload.style';
class Fileupload extends Component {
  initalState = {
    file_list: '',
    file_List_Data: [],
    tag_Cat: '',
    isLoader: false,
    fileid: '',
    countList: 0,
    tagList: [],
    fileSize: '',
    uploadDT: '',
    isOpen: false,
    getListData: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.initalState,
    };
  }
  componentDidMount() {
    this.setState({isOpen: false});
    this.getList();
  }

  getList = async () => {
    this.setState({isLoader: true});
    const access_token = this.props.userData.userData.access_token;
    try {
      await getAllCard(access_token)
        .then((response) => {
          this.setState({isLoader: false, getListData: response.data.items});
        })
        .catch((error) => {
          console.log('Error:get list ', error);
          this.setState({isLoader: false});
          alert(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  uploadFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      const ldata = {
        filename: results[0].name,
        filetype: results[0].type,
      };
      this.setState({
        file_list: results[0].name,
        countList: this.state.countList + 1,
      });
      var filedata = {
        doc: results[0].name,
        id: this.state.countList,
      };
      this.state.file_List_Data.push(filedata);
      this.uploadFileApi(ldata);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  uploadFileApi = async (ldata) => {
    this.setState({isLoader: true});
    const access_token = this.props.userData.userData.access_token;
    try {
      await uploadFile(access_token, ldata)
        .then((response) => {
          if (response.success === true) {
            this.setState({
              fileid: response.details.id,
              isLoader: false,
              isOpen: true,
              uploadDT: response.details.uploadDtm,
              fileSize: response.details.size,
            });
            ToastAndroid.showWithGravity(
              'Upload successfully',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          } else {
            ToastAndroid.showWithGravity(
              'failed',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
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
    const access_token = this.props.userData.userData.access_token;
    const fileid = this.state.fileid;
    let updateTagsList = [];
    updateTagsList.push(item.item);

    const data = qs.stringify({
      tags: `${updateTagsList}`,
    });

    try {
      await updateTagImage(fileid, access_token, data)
        .then((response) => {
          ToastAndroid.showWithGravity(
            'Tag added  successfully',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          this.setState({isLoader: false});
        })
        .catch((error) => {
          console.log('Error update tags: ', error);
          this.setState({isLoader: false});
        });
    } catch (error) {
      console.log(error);
    }
  };

  addTags = async () => {
    this.setState({isLoader: true});
    const access_token = this.props.userData.userData.access_token;
    const tags = {tags: this.state.tag_Cat};
    if (this.state.tag_Cat.length > 0) {
      try {
        await addTag(access_token, tags)
          .then((response) => {
            debugger;
            if (response.status === 'Success') {
              ToastAndroid.showWithGravity(
                'Tag added  successfully',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
              this.state.tagList.push(this.state.tag_Cat);
              this.setState({isLoader: false, tag_Cat: ''});
            } else {
              ToastAndroid.showWithGravity(
                'failed',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            this.setState({isLoader: false});
            }
          })
          .catch((error) => {
            this.setState({isLoader: false});
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      ToastAndroid.showWithGravity(
        'Please fill the Input text',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  renderUploadName(item, index) {
    return (
      <View style={styles.container}>
        <Text>{item.item.doc}</Text>
      </View>
    );
  }

  renderUploaTags(item) {
    return (
      <View style={styles.tagList}>
        <Chip onPress={() => this.updateTags(item)}>{item.item}</Chip>
      </View>
    );
  }
  renderCardAllItems(item) {
    const name = JSON.stringify(item.item.name);
    return (
      <View style={styles.getCardStyles}>
        <View style={styles.cardInner}>
          <Text>{name}</Text>
        </View>
        <View>
          <Text>{item.item.uploadDtm}</Text>
        </View>
        <View style={styles.cardSize}>
          <View>
            <Text>{item.item.size}</Text>
          </View>
          <View style={styles.cardDelete}>
            <TouchableOpacity onPress={() => this.deleteCard(item)}>
              <Icons name="delete" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  deleteCard = async (item) => {
    this.setState({isLoader: true});
    const access_token = this.props.userData.userData.access_token;
    const fileid = item.item.id;
    try {
      await deleteCardDetail(fileid, access_token)
        .then((response) => {
          ToastAndroid.showWithGravity(
            'deleted successfully',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          this.setState({isLoader: false});
          this.getList();
        })
        .catch((error) => {
          console.log('delete', error);
          this.setState({isLoader: false});
        });
    } catch (error) {
      console.log(error);
    }
  };

  getUploadedList() {
    this.setState({
      fileList: '',
      file_List_Data: [],
      tag_Cat: [],
      tagList: '',
      isOpen: false,
    });
    this.getList();
  }
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.header}>
        <View style={styles.titleView}>
          <View style={styles.rowObject}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons name="arrow-back" color="#000000" size={24} />
            </TouchableOpacity>
            <Title style={styles.title}>File Upload</Title>
            <View style={styles.uploadButtonView}>
              <Button title="Upload" onPress={() => this.uploadFile()}></Button>
            </View>
          </View>
        </View>
        {this.state.isOpen == true ? (
          <View style={styles.topContainer}>
            <View style={styles.innerView}>
              <FlatList
                data={this.state.file_List_Data}
                renderItem={(item, id) => this.renderUploadName(item)}
              />
            </View>
            <View style={styles.detailView}>
              <View style={styles.uploadDT}>
                <Text style={styles.fileView}>Size:</Text>
                <Text style={styles.fileView}>{this.state.fileSize}</Text>
              </View>
              <View style={styles.uploadDT}>
                <Text style={styles.fileView}>Uploaded:</Text>
                <Text style={styles.fileView}>{this.state.uploadDT}</Text>
              </View>
            </View>
            <View style={styles.uploadDT}>
              <Text style={styles.fileView}>Tags</Text>
            </View>
            <View style={styles.flistTags}>
              <FlatList
                data={this.state.tagList}
                numColumns={4}
                renderItem={(item, id) => this.renderUploaTags(item)}
              />
            </View>

            <View style={styles.inputTag}>
              <View style={styles.inputView}>
                <InputTextDynamic
                  value={this.state.tag_Cat}
                  onChangeText={(text) => {
                    this.setState({tag_Cat: text});
                  }}
                  placeholder="New Tag"
                  color={Color.orange}
                />
              </View>
              <View style={styles.tagButtonView}>
                <TouchableOpacity onPress={() => this.addTags()}>
                  <SimpleLineIcons name="plus" style={{fontSize: 35}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.getList}>
              <Button title="Save" onPress={() => this.getUploadedList()} />
            </View>
          </View>
        ) : null}

        {this.state.isOpen == false ? (
          <View style={styles.fileList}>
            <View style={styles.flatListrender}>
              <FlatList
                data={this.state.getListData}
                numColumns={2}
                renderItem={(item, id) => this.renderCardAllItems(item)}
                extraData={this.state.getListData}
              />
              <Loader isLoader={this.state.isLoader} />
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(Fileupload);
