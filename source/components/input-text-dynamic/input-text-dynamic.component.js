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
      theme={{colors:{primary: color}}}
    />
  </View>
);
export default InputTextDynamic;
