import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import Dots from 'react-native-dots-pagination';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';

import styles from './services.style';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      name: '',
      accNo: '',
      primaryAcHolder: '',
      provider: '',
      username: '',
      password: '',
      installment: '',
      from: '',
      to: '',
      total: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      securityQ1: '',
      securityA1: '',
      securityQ2: '',
      securityA2: '',
      securityQ3: '',
      securityA3: '',
      additionalAcHolder1: '',
      additionalAcHolder2: '',
    };
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 3) this.setState({active: active + 1});
    else if (active === 3) this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      accNo,
      primaryAcHolder,
      provider,
      username,
      password,
      installment,
      from,
      to,
      total,
      address1,
      address2,
      city,
      state,
      zip,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      additionalAcHolder1,
      additionalAcHolder2,
      access_token,
      navigation
    } = this.state;

    let data = qs.stringify({
      ServiceName: name,
      ServiceType: accNo,
      AccountNumber: primaryAcHolder,
      Provider: provider,
      WebsiteUserName: username,
      WebsitePassword: password,
      'PaymentSchedule-InstallmentAmount': installment,
      'PaymentSchedule-InstallmentStartDate': from,
      'PaymentSchedule-InstallmentEndDate': to,
      'PaymentSchedule-TotalAmount': total,
      'MailingAddress-Line1': address1,
      'MailingAddress-Line2': address2,
      'MailingAddress-City': city,
      'MailingAddress-State': state,
      'MailingAddress-Zip': zip,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      AdditionalAccountHolder1: additionalAcHolder1,
      AdditionalAccountHolder2: additionalAcHolder2,
    });

    await createOrUpdateRecord('ServiceAccount', `__NEW__`, data, access_token)
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
        return this.basicInformation();
        break;
      case 1:
        return this.paymentMailingAddress();
        break;
      case 2:
        return this.securityQuestions();
        break;
      case 3:
        return this.additionalInformation();
        break;
    }
  };

  basicInformation = () => (
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
          placeholder="Account Number"
          onChangeText={(accNo) => this.setState({accNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Primary Account Holder"
          onChangeText={(primaryAcHolder) => this.setState({primaryAcHolder})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Provider"
          onChangeText={(provider) => this.setState({provider})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Type" onPress={() => alert('Type')} />
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
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          onChangeText={(installment) => this.setState({installment})}
          icon="dollar-sign"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Due" onPress={() => alert('Type')} />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="From"
            onChangeText={(from) => this.setState({from})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="To"
            onChangeText={(to) => this.setState({to})}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Total"
          onChangeText={(total) => this.setState({total})}
          icon="dollar-sign"
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

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Account Holder 1"
          onChangeText={(additionalAcHolder1) =>
            this.setState({additionalAcHolder1})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Account Holder 2"
          onChangeText={(additionalAcHolder2) =>
            this.setState({additionalAcHolder2})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label="Is Credit Card Provided?"
          onPress={() => alert('Type')}
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
        return 'Payment Mailing Address';
        break;
      case 2:
        return 'Security Questions';
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
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

export default Services;
