import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text, Portal} from 'react-native-paper';
import Dots from 'react-native-dots-pagination';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {account_type, size, payment_due_type} from './bank-account.list';

import styles from './bank-account.style';

class BankAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      access_token: props.access_token,
      countryModal: false,
      navigation: props.navigation,
      isLoader: false,
      modal: false,
      array: [],
      key: '',
      title: '',
      dataType: '',
      name: '',
      issuingBank: '',
      accountNumber: '',
      bankRoutingNumber: '',
      userName: '',
      password: '',
      atm1CardNo: '',
      atm1CardPin: '',
      atm1CardExDate: '',
      atm1CVV: '',
      atm2CardNo: '',
      atm2CardPin: '',
      atm2CardExDate: '',
      atm2CVV: '',
      debit1CardNo: '',
      debit1CardPin: '',
      debit1CardExDate: '',
      debit1CVV: '',
      debit2CardNo: '',
      debit2CardPin: '',
      debit2CardExDate: '',
      debit2CVV: '',
      securityQ1: '',
      securityA1: '',
      securityQ2: '',
      securityA2: '',
      securityQ3: '',
      securityA3: '',
      boxNumber1: '',
      openedOn1: '',
      interestRate1: '',
      boxNumber2: '',
      openedOn2: '',
      interestRate2: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      accountType: '',
      size1: '',
      size2: '',
      paymentDueType1: '',
      paymentDueType2: '',
    };
  }

  subComponet = () => {
    const {active} = this.state;
    switch (active) {
      case 0:
        return this.basicInformation();
        break;
      case 1:
        return this.atmCard();
        break;
      case 2:
        return this.debitCard();
        break;
      case 3:
        return this.securityQuestions();
        break;
      case 4:
        return this.safetyDepositBox();
        break;
      case 5:
        return this.additonalInformation();
        break;
      case 6:
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
          placeholder="Issuing Bank"
          onChangeText={(issuingBank) => this.setState({issuingBank})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.accountType.length === 0
              ? 'Account Type'
              : this.state.accountType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: account_type,
              key: 'accountType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Account Number"
          onChangeText={(accountNumber) => this.setState({accountNumber})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Bank Routing Number"
          onChangeText={(bankRoutingNumber) =>
            this.setState({bankRoutingNumber})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={(userName) => this.setState({userName})}
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

  atmCard = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card Number"
          onChangeText={(atm1CardNo) => this.setState({atm1CardNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card PIN"
          onChangeText={(atm1CardPin) => this.setState({atm1CardPin})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(atm1CardExDate) => this.setState({atm1CardExDate})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(atm1CVV) => this.setState({atm1CVV})}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card Number"
          onChangeText={(atm2CardNo) => this.setState({atm2CardNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card PIN"
          onChangeText={(atm2CardPin) => this.setState({atm2CardPin})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(atm2CardExDate) => this.setState({atm2CardExDate})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(atm2CVV) => this.setState({atm2CVV})}
            keyboardType="default"
          />
        </View>
      </View>
    </View>
  );

  debitCard = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card Number"
          onChangeText={(debit1CardNo) => this.setState({debit1CardNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card PIN"
          onChangeText={(debit1CardPin) => this.setState({debit1CardPin})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(debit1CardExDate) =>
              this.setState({debit1CardExDate})
            }
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(debit1CVV) => this.setState({debit1CVV})}
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card Number"
          onChangeText={(debit2CardNo) => this.setState({debit2CardNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card PIN"
          onChangeText={(debit2CardPin) => this.setState({debit2CardPin})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(debit2CardExDate) =>
              this.setState({debit2CardExDate})
            }
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(debit2CVV) => this.setState({debit2CVV})}
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

  safetyDepositBox = () => (
    <View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Box Number"
            onChangeText={(boxNumber1) => this.setState({boxNumber1})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={this.state.size1.length === 0 ? 'Size' : this.state.size1}
            onPress={() =>
              this.setState({modal: true, array: size, key: 'size1'})
            }
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened on"
            onChangeText={(openedOn1) => this.setState({openedOn1})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Interest Rate"
            onChangeText={(interestRate1) => this.setState({interestRate1})}
            icon="dollar-sign"
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.paymentDueType1.length === 0
              ? 'Payment Due Type'
              : this.state.paymentDueType1
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: payment_due_type,
              key: 'paymentDueType1',
            })
          }
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Box Number"
            onChangeText={(boxNumber2) => this.setState({boxNumber2})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={this.state.size2.length === 0 ? 'Size' : this.state.size2}
            onPress={() =>
              this.setState({modal: true, array: size, key: 'size2'})
            }
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened on"
            onChangeText={(openedOn2) => this.setState({openedOn2})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Interest Rate"
            onChangeText={(interestRate2) => this.setState({interestRate2})}
            icon="dollar-sign"
            keyboardType="default"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.paymentDueType2.length === 0
              ? 'Payment Due Type'
              : this.state.paymentDueType2
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: payment_due_type,
              key: 'paymentDueType2',
            })
          }
        />
      </View>
    </View>
  );

  additonalInformation = () => (
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
        <ModalPicker label="Country" onPress={() => alert('Country')} />
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
      case 1:
        return 'ATM Card';
        break;
      case 2:
        return 'Debit Card';
        break;
      case 3:
        return 'Security Questions';
        break;
      case 4:
        return 'Safety Deposit Box';
        break;
      case 5:
        return 'Additional Information';
        break;
      case 6:
        return 'Notes';
        break;
    }
  };

  handleClick = () => {
    const {active} = this.state;
    console.log('Clicked');
    if (active < 5) {
      this.setState({active: active + 1});
    } else if (active === 5) {
      this.submit();
    }
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      access_token,
      navigation,
      name,
      issuingBank,
      accountNumber,
      bankRoutingNumber,
      userName,
      password,
      atm1CardNo,
      atm1CardPin,
      atm1CardExDate,
      atm1CVV,
      atm2CardNo,
      atm2CardPin,
      atm2CardExDate,
      atm2CVV,
      debit1CardNo,
      debit1CardPin,
      debit1CardExDate,
      debit1CVV,
      debit2CardNo,
      debit2CardPin,
      debit2CardExDate,
      debit2CVV,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      boxNumber1,
      openedOn1,
      interestRate1,
      boxNumber2,
      openedOn2,
      interestRate2,
      address1,
      address2,
      city,
      state,
      zip,
      accountType,
      size1,
      size2,
      paymentDueType1,
      paymentDueType2,
    } = this.state;

    let data = qs.stringify({
      AccountName: name,
      FinancialInstitution: issuingBank,
      AccountNumber: accountNumber,
      RoutingNumber: bankRoutingNumber,
      WebSiteUsername: userName,
      WebSitePassword: password,
      ATMCardNumber: atm1CardNo,
      ATMCardPIN: atm1CardPin,
      ATMCardExpirationDate: atm1CardExDate,
      ATMCardCCVNumber: atm1CVV,
      ATMCardNumber2: atm2CardNo,
      ATMCardPIN2: atm2CardPin,
      ATMCardExpirationDate2: atm2CardExDate,
      ATMCardCCVNumber2: atm2CVV,
      DebitCardNumber: debit1CardNo,
      DebitCardPIN: debit1CardPin,
      DebitCardExpirationDate: debit1CardExDate,
      DebitCardCCVNumber: debit1CVV,
      DebitCardNumber2: debit2CardNo,
      DebitCardPIN2: debit2CardPin,
      DebitCardExpirationDate2: debit2CardExDate,
      DebitCardCCVNumber2: debit2CVV,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      'SafetyDepositBox1-BoxNumber': boxNumber1,
      'SafetyDepositBox1-BoxOpeningDate': openedOn1,
      'SafetyDepositBox1-Fee': interestRate1,
      'SafetyDepositBox1-BoxSize': size1,
      'SafetyDepositBox1-FeeDuration': paymentDueType1,
      'SafetyDepositBox2-BoxNumber': boxNumber2,
      'SafetyDepositBox2-BoxOpeningDate': openedOn2,
      'SafetyDepositBox2-Fee': interestRate2,
      'SafetyDepositBox2-BoxSize': size2,
      'SafetyDepositBox2-FeeDuration': paymentDueType2,
      'BankBranchAddress-Line1': address1,
      'BankBranchAddress-Line2': address2,
      'BankBranchAddress-City': city,
      'BankBranchAddress-State': state,
      'BankBranchAddress-Zip': zip,
      AccountType: accountType,
    });
    await createOrUpdateRecord('BankAccounts', `__NEW__`, data, access_token)
      .then((response) => {
        this.setState({isLoader: false, active: 0});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  buttonTitle = (active) => {
    if (active === 5) return 'Submit';
    else return 'Proceed to next account';
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
          <Button onPress={this.handleClick} title={this.buttonTitle(active)} />
        </View>
        <View style={styles.inputContainer}>
          <Dots
            length={6}
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

export default BankAccounts;
