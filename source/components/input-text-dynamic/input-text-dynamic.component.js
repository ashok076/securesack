import React from 'react';
import {View} from 'react-native';
import {Content, Form, Item, Input, Label} from 'native-base';

import styles from './input-text-dynamic.style.js';

const InputTextDynamic = ({
  placeholder,
  onChangeText,
  value,
  keyboardType,
  editable,
  color,
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
export default InputTextDynamic;
