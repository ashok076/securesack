import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

import styles from './input-text-dynamic.style.js';

const InputTextDynamic = ({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  editable,
  color,
  example,
  onChange
}) => (
  <View>
    <TextInput
      label={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      disabled={editable}
      style={styles.input}
      selectionColor={color}
      theme={{colors: {primary: color}}}
      underlineColor={'rgb(33, 47, 60)'}
    />
  </View>
);
export default InputTextDynamic;
