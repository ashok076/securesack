import React from 'react';
import {View} from 'react-native';
import {Content, Form, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import styles from './input-text-icon-dynamic.style';

const InputTextIconDynamic = ({
  placeholder,
  icon,
  onChangeText,
  value,
  right,
  editable,
  color,
  keyboardType,
}) => (
  <Form>
    <Item floatingLabel style={{borderColor: color}}>
      <Label style={{color: color}}>{placeholder}</Label>
      <Input
        onChangeText={onChangeText}
        editable={editable}
        value={value}
        keyboardType={keyboardType}
        inputHeightBase={10}
        style={[styles.input]}
        selectionColor={color}
      />
    </Item>
  </Form>
);

export default InputTextIconDynamic;
