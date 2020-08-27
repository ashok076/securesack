import React, {Component} from 'react';
import {View, Modal, FlatList} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';

import styles from './modal.style';

class ModalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  displayLabel = (item) => (
    <TouchableRipple
      rippleColor="rgba(0, 0, 0, .32)"
      onPress={() => this.addValue(item)}>
      <View style={styles.labelView}>
        <Text style={styles.label}> {item} </Text>
      </View>
    </TouchableRipple>
  );

  addValue = (item) => {
    const {id, changeState} = this.props;
    changeState(id, item);
    this.closeModal();
  };

  closeModal = () => {
    const {changeModalVisibility} = this.props;
    changeModalVisibility(false);
  };

  render() {
    const {isModalVisible, list} = this.props;
    console.log('List: ', JSON.stringify(list));
    return (
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalList}>
            <FlatList
              data={list}
              renderItem={({item}) => this.displayLabel(item)}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalScreen;
