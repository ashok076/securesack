import React, {Component} from 'react';
import {View, FlatList, Modal} from 'react-native';
import {Text, Title, TouchableRipple} from 'react-native-paper';
import axios from 'axios';

import {BASE_URL} from '../../configuration/api/api.types';

import styles from './data-type-modal.style';

class DataTypeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: props.access_token,
      visible: props.visible,
      type: props.type,
      title: props.title,
      label: [],
      value: '',
    };
  }

  componentDidMount() {
    this.loadItem();
  }

  loadItem = async () => {
    const {access_token, type} = this.state;
    let config = {
      method: 'get',
      url: `${BASE_URL}/actions/lookup/${type}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + access_token,
      },
    };
    console.log("Item: ", config)
    await axios(config)
      .then((res) => {
        console.log('res: ', res.data);
        this.setState({label: res.data});
      })
      .catch((error) => console.log('Data Type Modal error: ', error));
  };

  renderLabel = (item) => (
    <TouchableRipple
      rippleColor="rgba(0, 0, 0, .32)"
      style={styles.labelView}
      onPress={() =>
        this.setState({value: item.label}, () =>
          console.log('Item:', this.state.value),
        )
      }>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableRipple>
  );

  render() {
    const {visible, title, label} = this.state;
    console.log('visible', this.props);
    return (
      <Modal transparent={true} animationType={'fade'} visible={visible}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <View style={styles.titleView}>
              <Title style={styles.title}>{title}</Title>
            </View>
            <View>
              <FlatList
                data={label}
                renderItem={({item}) => this.renderLabel(item)}
              />
            </View>
            <TouchableRipple
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.closeView}
              onPress={() => this.setState({visible: false})}>
              <View>
                <Title style={styles.close}>Close</Title>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </Modal>
    );
  }
}
export default DataTypeModal;
