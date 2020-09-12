import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Autocomplete from '../auto-complete-lib/auto-complete.component';

import styles from './auto-complete-text-input.style';

class AutoCompleteText extends Component {
  renderLable = (item, i) =>
    this.props.value > 0 && (
      <TouchableOpacity onPress={() => this.props.onPress(item)}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );

  render() {
    const {
      placeholder,
      onChangeText,
      value,
      keyboardType,
      editable,
      color,
      array,
      hideResult,
    } = this.props;
    return (
      <Autocomplete
        label={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        disabled={editable}
        style={styles.input}
        selectionColor={color}
        theme={{colors: {primary: color}}}
        underlineColor={'rgb(33, 47, 60)'}
        data={array}
        renderItem={({item, i}) => this.renderLable(item, i)}
        hideResult={hideResult}
        disable={editable}
      />
    );
  }
}

export default AutoCompleteText;
