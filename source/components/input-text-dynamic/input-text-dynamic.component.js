import React from 'react';
import {TextInput, View} from 'react-native';

import styles from "./input-text-dynamic.style.js"

const InputTextDynamic = ({placeholder, onChangeText, value, keyboardType}) => (
  <View>
    <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="rgb(33, 47, 60)"
      value={value}
      keyboardType={keyboardType}
    />
  </View>
);
export default InputTextDynamic;
