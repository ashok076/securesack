import React from 'react';
import {Item} from 'native-base';
import {TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import styles from './input-text-icon-dynamic.style';

const InputTextIconDynamic = ({placeholder, icon, onChangeText, value}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      placeholderTextColor="rgb(33, 47, 60)"
      onChangeText={onChangeText}
      value={value}
    />
    <Icon size={15} color="rgb(33, 47, 60)" name={icon} style={styles.iconStyle} />
  </View>
);

export default InputTextIconDynamic;
