import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {payment_due_type} from './auto.list';
import {Color} from '../../../assets/color/color.js';

import styles from './auto.style';

class Auto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      recid: props.recid,
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
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      navigation,
      access_token,
      recid,
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

    await createOrUpdateRecord('AutoInsurance', recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  basicInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Primary Policy Holder"
          onChangeText={(primaryPolicyHolder) =>
            this.setState({primaryPolicyHolder})
          }
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Number"
          onChangeText={(policyNumber) => this.setState({policyNumber})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
          color={Color.veryLightPink}
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
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="To"
          icon="dollar-sign"
          onChangeText={(to) => this.setState({to})}
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Total"
          icon="dollar-sign"
          onChangeText={(total) => this.setState({total})}
          color={Color.veryLightPink}
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
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.miniInputContainer}>
        <InputTextDynamic
          placeholder="Ends On"
          onChangeText={(endsOn) => this.setState({endsOn})}
          keyboardType="default"
          color={Color.veryLightPink}
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
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 2"
          onChangeText={(additionalPolicyHolder2) =>
            this.setState({additionalPolicyHolder2})
          }
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 3"
          onChangeText={(additionalPolicyHolder3) =>
            this.setState({additionalPolicyHolder3})
          }
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 4"
          onChangeText={(additionalPolicyHolder4) =>
            this.setState({additionalPolicyHolder4})
          }
          keyboardType="default"
          color={Color.veryLightPink}
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
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
    </View>
  );

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  render() {
    const {isLoader, modal, array, key} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Basic Information</Text>
        {this.basicInformation()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Additional Policy Holder</Text>
        {this.additionalPolicyHolders()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Security Questions</Text>
        {this.securityQuestions()}
        <View style={styles.gap}/>
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Submit" />
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
