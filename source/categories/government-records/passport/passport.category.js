import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Dots from 'react-native-dots-pagination';

import styles from './passport.style';

class Passport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 2) this.setState({active: active + 1});
  };

  subComponet = () => {
    const {active} = this.state;
    switch (active) {
      case 0:
        return this.basicInformation();
        break;
      case 1:
        return this.additionalInfo();
        break;
      case 2:
        return this.previousPassports();
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
        <ModalPicker label="Country of Issue" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Passport Number"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
      </View>
    </View>
  );

  additionalInfo = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Country Type" onPress={() => alert('Type')} />
      </View>
    </View>
  );

  previousPassports = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Old Passport Number 1"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expired On"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Old Passport Number 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expired On"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
      case 1:
        return 'Additional Information';
        break;
      case 1:
        return 'Previous Passports';
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

export default Passport;
