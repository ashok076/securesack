import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import Dots from 'react-native-dots-pagination';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';

import styles from './credit-card.style';

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      name: '',
      cardHolderName: '',
      cardNo: '',
      expiryDate: '',
      cvv: '',
      url: '',
      username: '',
      password: '',
      cardHolderName2: '',
      cardNo2: '',
      expiryDate2: '',
      cvv2: '',
      securityQ1: '',
      securityA1: '',
      securityQ2: '',
      securityA2: '',
      securityQ3: '',
      securityA3: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    };
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 4) this.setState({active: active + 1});
    else if (active === 4) this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      cardHolderName,
      cardNo,
      expiryDate,
      cvv,
      url,
      username,
      password,
      cardHolderName2,
      cardNo2,
      expiryDate2,
      cvv2,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      address1,
      address2,
      city,
      state,
      zip,
      access_token,
      navigation,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      PrimaryCardHolder: cardHolderName,
      CardNumber: cardNo,
      ExpirationDate: expiryDate,
      CreditCardVerificationValue: cvv,
      URL: url,
      WebSiteAccountNumber: username,
      WebSitePassword: password,
      AdditionalCardHolder: cardHolderName2,
      AdditionalCardNumber: cardNo2,
      AdditionalCardExpirationDate: expiryDate2,
      AdditionalCreditCardVerificationValue: cvv2,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      'PaymentMailingAddress-Line1': address1,
      'PaymentMailingAddress-Line2': address2,
      'PaymentMailingAddress-City': city,
      'PaymentMailingAddress-State': state,
      'PaymentMailingAddress-Zip': zip,
    });
    await createOrUpdateRecord('CreditCard', `__NEW__`, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

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
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={(cardHolderName) => this.setState({cardHolderName})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Type" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo) => this.setState({cardNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate) => this.setState({expiryDate})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv) => this.setState({cvv})}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
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
          onChangeText={(cardHolderName2) => this.setState({cardHolderName2})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo2) => this.setState({cardNo2})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate2) => this.setState({expiryDate2})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv2) => this.setState({cvv2})}
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
          onChangeText={(securityQ1) => this.setState({securityQ1})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
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
          onChangeText={(address1) => this.setState({address1})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
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
    const {active, isLoader} = this.state;
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
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

export default CreditCard;
