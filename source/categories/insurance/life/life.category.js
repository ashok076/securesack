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
import {payment_due_type} from './life.list';

import styles from './life.style';

class Life extends Component {
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
      policyNo: '',
      policyHolder: '',
      issuer: '',
      premiumAmnt: '',
      insuredAmnt: '',
      url: '',
      username: '',
      password: '',
      customerServiceNo: '',
      emailProvided: '',
      effectiveFrom: '',
      endsOn: '',
      installment: '',
      from: '',
      to: '',
      total: '',
      paymentDueType: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      beneficiaries1: '',
      beneficiaries2: '',
      beneficiaries3: '',
      beneficiaries4: '',
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
      policyNo,
      policyHolder,
      issuer,
      premiumAmnt,
      insuredAmnt,
      url,
      username,
      password,
      customerServiceNo,
      emailProvided,
      effectiveFrom,
      endsOn,
      installment,
      from,
      to,
      total,
      paymentDueType,
      address1,
      address2,
      city,
      state,
      zip,
      beneficiaries1,
      beneficiaries2,
      beneficiaries3,
      beneficiaries4,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      PolicyNumber: policyNo,
      PolicyHolder: policyHolder,
      Issuer: issuer,
      PremiumAmount: premiumAmnt,
      InsuranceAmount: insuredAmnt,
      URL: url,
      WebSiteUserName: username,
      WebSitePassword: password,
      Phone: customerServiceNo,
      EmailAddress: emailProvided,
      StartDate: effectiveFrom,
      EndDate: endsOn,
      'PaymentSchedule-InstallmentAmount': installment,
      'PaymentSchedule-InstallmentStartDate': from,
      'PaymentSchedule-InstallmentEndDate': to,
      'PaymentSchedule-TotalAmount': total,
      'PaymentSchedule-PaymentDueType': paymentDueType,
      'ClaimsMailingAddress-Line1': address1,
      'ClaimsMailingAddress-Line2': address2,
      'ClaimsMailingAddress-City': city,
      'ClaimsMailingAddress-State': state,
      'ClaimsMailingAddress-Zip': zip,
      Beneficiary1: beneficiaries1,
      Beneficiary2: beneficiaries2,
      Beneficiary3: beneficiaries3,
      Beneficiary4: beneficiaries4,
    });

    await createOrUpdateRecord('LifeInsurance', `__NEW__`, data, access_token)
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
        return this.claimMailingAddress();
        break;
      case 3:
        return this.beneficiaries();
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
          placeholder="Policy Number"
          onChangeText={(policyNo) => this.setState({policyNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Holder"
          onChangeText={(policyHolder) => this.setState({policyHolder})}
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
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextIconDynamic
            placeholder="Premium Amount"
            onChangeText={(premiumAmnt) => this.setState({premiumAmnt})}
            icon="dollar-sign"
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Insured Amount"
            onChangeText={(insuredAmnt) => this.setState({insuredAmnt})}
            icon="dollar-sign"
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
          placeholder="Username"
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

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Customer Service Number"
          onChangeText={(customerServiceNo) =>
            this.setState({customerServiceNo})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Email Provided"
          onChangeText={(emailProvided) => this.setState({emailProvided})}
          keyboardType="default"
        />
      </View>
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
            placeholder="Expiration"
            onChangeText={(endsOn) => this.setState({endsOn})}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          icon="dollar-sign"
          onChangeText={(installment) => this.setState({installment})}
        />
      </View>
      <View style={[styles.inputContainer]}>
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

  claimMailingAddress = () => (
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
        <ModalPicker label="Account Type" onPress={() => alert('Type')} />
      </View>
    </View>
  );

  beneficiaries = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 1"
          onChangeText={(beneficiaries1) => this.setState({beneficiaries1})}
          icon="dollar-sign"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 2"
          onChangeText={(beneficiaries2) => this.setState({beneficiaries2})}
          icon="dollar-sign"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 3"
          onChangeText={(beneficiaries3) => this.setState({beneficiaries3})}
          icon="dollar-sign"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 4"
          onChangeText={(beneficiaries4) => this.setState({beneficiaries4})}
          icon="dollar-sign"
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
        return 'Claims Mailing Address';
        break;
      case 3:
        return 'Beneficiaries';
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

export default Life;
