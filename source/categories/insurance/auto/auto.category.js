import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Dots from 'react-native-dots-pagination';

import styles from './auto.style';

class Auto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 3) this.setState({active: active + 1});
  };

  subComponet = () => {
    const {active} = this.state;
    switch (active) {
      case 0:
        return this.basicInformation();
        break;
      case 1:
        return this.additionalInformation();
        break;
      case 2:
        return this.additionalPolicyHolders();
        break;
      case 3:
        return this.securityQuestions();
        break;
    }
  };

  basicInformation = () => (
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
          placeholder="Primary Policy Holder"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Number"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={this.handlePasswordText}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Premium"
          icon="dollar-sign"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          icon="dollar-sign"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={[styles.inputContainer, {marginRight: 10}]}>
        <ModalPicker label="Due" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="From"
          icon="dollar-sign"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="To"
          icon="dollar-sign"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Total"
          icon="dollar-sign"
          onChangeText={this.handlePasswordText}
        />
      </View>
    </View>
  );

  additionalInformation = () => (
    <View style={styles.miniContainer}>
      <View style={[styles.miniInputContainer, {marginRight: 10}]}>
        <InputTextDynamic
          placeholder="Effective From"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniInputContainer}>
        <InputTextDynamic
          placeholder="Ends On"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
    </View>
  );

  additionalPolicyHolders = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 1"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
    </View>
  );

  securityQuestions = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 1"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
      case 1:
        return "Additional Information";
        break;
      case 2:
        return "Additional Policy Holder";
        break;
      case 3:
        return "Security Questions";
        break;
    }
  };

  render() {
    const {active} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.title(active)}</Text>
        {this.subComponet()}
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Proceed to next" />
        </View>
        <View style={styles.inputContainer}>
          <Dots
            length={4}
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

export default Auto;
