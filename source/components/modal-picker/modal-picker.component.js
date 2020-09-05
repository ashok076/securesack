import React from 'react';
import {View, Text, ScrollView, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Form, Item, Label, Input} from 'native-base';
import {TouchableRipple} from 'react-native-paper';

import ModalScreen from '../modal/modal.component';

import styles from './modal-picker.style';

const ModalPicker = ({label, onPress, color}) => (
  <Form>
    <Item style={{borderColor: color}}>
      <TouchableRipple
        style={[styles.container]}
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={onPress}>
        <View style={{backgroundColor: 'red'}}>
          <Label style={[styles.label, {color: color}]}>{label}</Label>
          <Icon
            name="arrow-down"
            size={10}
            color="rgb(33, 47, 60)"
            style={styles.icon}
          />
        </View>
      </TouchableRipple>
    </Item>
  </Form>
);

export default ModalPicker;
