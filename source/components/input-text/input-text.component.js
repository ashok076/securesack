import React from 'react';
import {TextInput, View} from 'react-native';

import styles from "./input-text.style.js"

const InputText = ({placeholder, onChange, value}) => (
  <View>
    <TextInput 
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      onChange={onChange}
      placeholderTextColor="#FFFFFF"
    />
  </View>
);
export default InputText;
