import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Autocomplete from '../auto-complete-lib/auto-complete.component';

import styles from './auto-complete-text-input.style';

class AutoCompleteText extends Component {
  renderLable = (item, i) => {
    return (
      this.props.value.length > 0 && (
        <TouchableOpacity
          onPress={() => this.props.onPress(item)}
          style={styles.labelView}>
          <Text>{item.label}</Text>
        </TouchableOpacity>
      )
    );
  };

  find = (val, array) => {
    if (val === '') {
      return [];
    }
    const regex = new RegExp(`${val.trim()}`, 'i');
    const arr = array.filter((array) => array.label.search(regex) >= 0);
    return arr;
  };

  render() {
    const {
      placeholder,
      onChangeText,
      value,
      keyboardType,
      editable,
      color,
      array,
      show,
      hideResult,
    } = this.props;
    const arr = this.find(value, array);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    const add = {label: 'Add'};
    return (
      <Autocomplete
        label={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        disabled={editable}
        style={styles.input}
        selectionColor={color}
        theme={{colors: {primary: color}}}
        underlineColor={'rgb(33, 47, 60)'}
        data={
          arr.length === 1 && comp(value, arr[0].label) ? [] : [...arr, add]
        }
        renderItem={({item, i}) => this.renderLable(item, i)}
        disable={editable}
      />
    );
  }
}

export default AutoCompleteText;
