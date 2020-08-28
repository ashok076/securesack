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
import ModalScreen from '../../../components/modal/modal.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {payment_due_type} from './auto.list';

import styles from './auto.style';

class Auto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      modal: '',
      array: [],
      key: '',
      name: '',
      primaryPolicyHolder: '',
      policyNumber: '',
      issuer: '',
      premium: '',
      installment: '',
      from: '',
      to: '',
      total: '',
      paymentDueType: '',
      url: '',
      username: '',
      password: '',
      effectiveFrom: '',
      endsOn: '',
      additionalPolicyHolder1: '',
      additionalPolicyHolder2: '',
      additionalPolicyHolder3: '',
      additionalPolicyHolder4: '',
      securityQ1: '',
      securityA1: '',
      securityQ2: '',
      securityA2: '',
      securityQ3: '',
      securityA3: '',
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
      navigation,
      access_token,
      name,
      primaryPolicyHolder,
      policyNumber,
      issuer,
      premium,
      installment,
      from,
      to,
      total,
      paymentDueType,
      url,
      username,
      password,
      effectiveFrom,
      endsOn,
      additionalPolicyHolder1,
      additionalPolicyHolder2,
      additionalPolicyHolder3,
      additionalPolicyHolder4,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      PrimaryPolicyHolder: primaryPolicyHolder,
      PolicyNumber: policyNumber,
      Issuer: issuer,
      PolicyPremium: premium,
      'PaymentSchedule-InstallmentAmount': installment,
      'PaymentSchedule-InstallmentStartDate': from,
      'PaymentSchedule-InstallmentEndDate': to,
      'PaymentSchedule-TotalAmount': total,
      'PaymentSchedule-PaymentDueType': paymentDueType,
      URL: url,
      username,
      password,
      StartDate: effectiveFrom,
      EndDate: endsOn,
      AdditionalPolicyHolder1: additionalPolicyHolder1,
      AdditionalPolicyHolder2: additionalPolicyHolder2,
      AdditionalPolicyHolder3: additionalPolicyHolder3,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
    });

    await createOrUpdateRecord('AutoInsurance', `__NEW__`, data, access_token)
      .then((response) => {
        this.setState({isLoader: false, active: 0});
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
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Primary Policy Holder"
          onChangeText={(primaryPolicyHolder) =>
            this.setState({primaryPolicyHolder})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Number"
          onChangeText={(policyNumber) => this.setState({policyNumber})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Premium"
          icon="dollar-sign"
          onChangeText={(premium) => this.setState({premium})}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          icon="dollar-sign"
          onChangeText={(installment) => this.setState({installment})}
        />
      </View>
      <View style={[styles.inputContainer, {marginRight: 10}]}>
        <ModalPicker
          label={
            this.state.paymentDueType.length === 0
              ? 'Due'
              : this.state.paymentDueType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: payment_due_type,
              key: 'paymentDueType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="From"
          icon="dollar-sign"
          onChangeText={(from) => this.setState({from})}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="To"
          icon="dollar-sign"
          onChangeText={(to) => this.setState({to})}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Total"
          icon="dollar-sign"
          onChangeText={(total) => this.setState({total})}
        />
      </View>
    </View>
  );

  additionalInformation = () => (
    <View style={styles.miniContainer}>
      <View style={[styles.miniInputContainer, {marginRight: 10}]}>
        <InputTextDynamic
          placeholder="Effective From"
          onChangeText={(effectiveFrom) => this.setState({effectiveFrom})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniInputContainer}>
        <InputTextDynamic
          placeholder="Ends On"
          onChangeText={(endsOn) => this.setState({endsOn})}
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
          onChangeText={(additionalPolicyHolder1) =>
            this.setState({additionalPolicyHolder1})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 2"
          onChangeText={(additionalPolicyHolder2) =>
            this.setState({additionalPolicyHolder2})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 3"
          onChangeText={(additionalPolicyHolder3) =>
            this.setState({additionalPolicyHolder3})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 4"
          onChangeText={(additionalPolicyHolder4) =>
            this.setState({additionalPolicyHolder4})
          }
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

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
      case 1:
        return 'Additional Information';
        break;
      case 2:
        return 'Additional Policy Holder';
        break;
      case 3:
        return 'Security Questions';
        break;
    }
  };

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  render() {
    const {active, isLoader, modal, array, key} = this.state;
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
        <ModalScreen
          isModalVisible={modal}
          list={array}
          changeModalVisibility={this.changeModalVisibility}
          id={key}
          changeState={this.changeState}
        />
      </View>
    );
  }
}

export default Auto;
