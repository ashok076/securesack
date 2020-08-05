import React from 'react';
import {Item} from 'native-base';
import {TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import styles from './input-text-search.style';

const InputTextSearch = ({placeholder, onChange, value}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      placeholderTextColor="#212F3C"
      onChange={onChange}
      value={value}
    />
    <TouchableOpacity>
      <View style={styles.iconBackgroundView}>
        <Icon size={24} color="white" name="search" />
      </View>
    </TouchableOpacity>
  </View>
);

export default InputTextSearch;
