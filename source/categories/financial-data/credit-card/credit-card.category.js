import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Dots from 'react-native-dots-pagination';

import styles from './credit-card.style';

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
    };
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 4) this.setState({active: active + 1});
  }

  subComponet = () => {
    const {active} = this.state;
    switch (active) {
      case 0:
        return this.primaryCard();
        break;
      case 1:
        return this.additionalCardInfo();
        break;
      case 2:
        return this.securityQuestions();
        break;
      case 3:
        return this.paymentMailingAddress();
        break;
      case 4:
        return this.additionalInformation();
        break;
      default:
        break;
    }
  };

  primaryCard = () => (
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
    </View>
  );

  additionalCardInfo = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
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

  paymentMailingAddress = () => (
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
        <ModalPicker label="Country" onPress={() => alert('Type')} />
      </View>
    </View>
  );

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Credit Limit"
          onChangeText={this.handleFirstNaame}
          icon="dollar-sign"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="APR"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Monthly Payment Date"
          onChangeText={this.handleFirstNaame}
          icon="percent"
          keyboardType="default"
        />
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Primary Card';
        break;
      case 1:
        return 'Additional Card Information';
        break;
      case 2:
        return 'Security Questions';
        break;
      case 3:
        return 'Payment Mailing Address';
        break;
      case 4:
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
        <Button onPress={this.handleClick} title="Proceed to next account" />
      </View>
        <View style={styles.inputContainer}>
          <Dots
            length={5}
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

export default CreditCard;
