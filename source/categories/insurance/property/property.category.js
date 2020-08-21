import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Dots from 'react-native-dots-pagination';

import styles from './property.style';

class PropertyInsurance extends Component {
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
        return this.propertyDetails();
        break;
      case 2:
        return this.insuranceDetails();
        break;
      case 3:
        return this.additionalInfo();
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
          placeholder="Policy Number"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Holder"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Installment Amount"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker label="Escrow Account" onPress={() => alert('Type')} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={this.handlePasswordText}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={this.handlePasswordText}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={this.handlePasswordText}
          keyboardType="default"
        />
      </View>
    </View>
  );

  propertyDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="County"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Parcel Number"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={this.handleFirstNaame}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker label="Owned Property" onPress={() => alert('Type')} />
        </View>
      </View>
    </View>
  );

  insuranceDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Dwelling Coverage (A)"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Liability Coverage (B)"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Medical Payment Coverage (C)"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Dwelling Coverage Deductible"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Loss of Use Coverage (F)"
          onChangeText={this.handlePasswordText}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label="Replacement of Contents Coverage"
            onPress={() => alert('Type')}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label="Loss Assessment Coverage"
            onPress={() => alert('Type')}
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label="Sewer Backup Coverage"
            onPress={() => alert('Type')}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Ordiance/Legal Coverage"
            onChangeText={this.handlePasswordText}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Personal Items Insured"
          onChangeText={this.handlePasswordText}
        />
      </View>
    </View>
  );

  additionalInfo = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Policy Holder 2"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Policy Holder 3"
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
        return 'Property Details';
        break;
      case 2:
        return 'Insurance Details';
        break;
      case 3:
        return 'Additional Information';
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

export default PropertyInsurance;
