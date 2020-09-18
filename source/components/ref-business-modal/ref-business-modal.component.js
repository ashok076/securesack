import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../input-text-dynamic/input-text-dynamic.component';
import Button from '../button/button.component';
import {addBusinessEntity} from '../../configuration/api/api.functions';
import {Color} from '../../assets/color/color.js';

import styles from './ref-business-modal.style';

class RefBusinessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      url: '',
    };
  }

  add = async () => {
    const {name, phone, url} = this.state;
    const {access_token} = this.props;
    let data = qs.stringify({
      name,
      phone,
      url,
    });

    console.log('Clicked', access_token);
    await addBusinessEntity(access_token, data)
      .then((response) => {
        console.log('Ref Business: ', response);
        this.closeModal();
        this.refreshList();
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  closeModal = () => {
    const {changeModalVisibility} = this.props;
    changeModalVisibility(false);
  };

  refreshList = () => {
    const {refreshingList} = this.props;
    refreshingList();
  };

  render() {
    const {isModalVisible} = this.props;
    return (
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.modalList}>
              <InputTextDynamic
                placeholder="Name"
                onChangeText={(name) => this.setState({name})}
                keyboardType="default"
                value={this.state.name}
                color={Color.lightishBlue}
              />
              <InputTextDynamic
                placeholder="Phone"
                onChangeText={(phone) => this.setState({phone})}
                keyboardType="default"
                value={this.state.phone}
                color={Color.lightishBlue}
              />
              <InputTextDynamic
                placeholder="URL"
                onChangeText={(url) => this.setState({url})}
                keyboardType="default"
                value={this.state.url}
                color={Color.lightishBlue}
              />
              <View style={styles.miniContainer}>
                <View style={[styles.miniInputContainer, {marginRight: 10}]}>
                  <Button
                    onPress={this.closeModal}
                    title="Cancel"
                    color="#DDDDDD"
                  />
                </View>
                <View style={styles.miniInputContainer}>
                  <Button onPress={this.add} title="Save" />
                </View>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
}

export default RefBusinessModal;
