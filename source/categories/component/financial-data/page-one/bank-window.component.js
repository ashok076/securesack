import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';

import InputTextDynamic from '../../../../components/input-text-dynamic/input-text-dynamic.component.js';
import ModalPicker from '../../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../../components/button/button.component';
import Dots from 'react-native-dots-pagination';

import styles from './bank-window.style';

class BankWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: ['Test 1', 'Test 2'],
      active: 0,
    };
  }

  subComponet = () => {
    const {active} = this.state;
    switch (active) {
      case 0:
      return this.firstComponent();
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        break;
    }
  };

  firstComponent = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Name"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Type" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={this.handleClick} title="Proceed to next account" />
      </View>
    </View>
  );

  render() {
    const {active} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Primary Card</Text>
        {this.subComponet()}
        <View style={styles.inputContainer}>
          <Dots
            length={3}
            active={active}
            passiveColor="rgba(52, 105, 244, 0.2)"
            activeColor="rgb(52,105,244)"
            passiveDotWidth={8}
            passiveDotHeight={8}
            activeDotWidth={8}
            activeDotHeight={8}
            paddingVertical={10}
          />
        </View>
      </View>
    );
  }
}

export default BankWindow;
