import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableRipple} from 'react-native-paper';
import styles from './modal-picker.style';

const ModalPicker = ({label, onPress}) => (
  <TouchableRipple
    style={styles.container}
    rippleColor="rgba(0, 0, 0, .32)"
    onPress={onPress}>
    <View>
      <Text style={styles.label}>{label}</Text>
      <Icon
        name="arrow-down"
        size={10}
        color="rgb(33, 47, 60)"
        style={styles.icon}
      />
    </View>
  </TouchableRipple>
);

export default ModalPicker;