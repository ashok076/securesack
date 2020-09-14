import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Autocomplete from '../auto-complete-lib/auto-complete.component';

import styles from './auto-complete-text-input.style';

class AutoCompleteText extends Component {
  renderLable = (item, i) => {
    console.log('Item: ', item);
    return (
      this.props.value.length > 0 && (
        <TouchableOpacity onPress={() => this.props.onPress(item)} style={styles.labelView}>
          <Text>{item.label}</Text>
        </TouchableOpacity>
      )
    );
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
        data={array.slice(0, array.length - 1)}
        renderItem={({item, i}) => this.renderLable(item, i)}
        hideResults={hideResult}
        disable={editable}
        maxRender={array.length - 1}
      />
    );
  }
}

export default AutoCompleteText;
