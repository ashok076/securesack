import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text, Portal} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import {
  createOrUpdateRecord,
  viewRecords,
} from '../../../configuration/api/api.functions';
import {account_type, size, payment_due_type} from './bank-account.list';
import {Color} from '../../../assets/color/color.js';
import {connect} from 'react-redux';

import styles from './bank-account.style';

class BankAccounts extends Component {
  initialState = {
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
    country: '',
    accountType: '',
    size1: '',
    size2: '',
    paymentDueType1: '',
    paymentDueType2: '',
    save: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.didBlurSubscription = navigation.addListener('focus', () => {
      this.setState(this.initialState);
      this.viewRecord();
    });
  }

  viewRecord = async () => {
    const {recid, access_token} = this.props;
    this.setState({isLoader: true});
    await viewRecords('BankAccounts', recid, access_token)
      .then((response) => {
        console.log('View res: ', response);
        this.setViewData(response.data);
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
  };

  setViewData = (data) => {
    this.setState({
      name: data.AccountName,
      issuingBank: data.FinancialInstitution,
      accountNumber: data.AccountNumber,
      bankRoutingNumber: data.RoutingNumber,
      userName: data.WebSiteUsername,
      password: data.WebSitePassword,
      atm1CardNo: data.ATMCardNumber,
      atm1CardPin: data.ATMCardPIN,
      atm1CardExDate: data.ATMCardExpirationDate,
      atm1CVV: data.ATMCardCCVNumber,
      atm2CardNo: data.ATMCardNumber2,
      atm2CardPin: data.ATMCardPIN2,
      atm2CardExDate: data.ATMCardExpirationDate2,
      atm2CVV: data.ATMCardCCVNumber2,
      debit1CardNo: data.DebitCardNumber,
      debit1CardPin: data.DebitCardPIN,
      debit1CardExDate: data.DebitCardExpirationDate,
      debit1CVV: data.DebitCardCCVNumber,
      debit2CardNo: data.DebitCardNumber2,
      debit2CardPin: data.DebitCardPIN2,
      debit2CardExDate: data.DebitCardExpirationDate2,
      debit2CVV: data.DebitCardCCVNumber2,
      securityQ1: data.SecurityQuestion1,
      securityA1: data.SecurityAnswer1,
      securityQ2: data.SecurityQuestion2,
      securityA2: data.SecurityAnswer2,
      securityQ3: data.SecurityQuestion3,
      securityA3: data.SecurityAnswer3,
      boxNumber1: data.SafetyDepositBox1.BoxNumber,
      openedOn1: data.SafetyDepositBox1BoxOpeningDate,
      interestRate1: data.SafetyDepositBox1.Fee,
      size1: data.SafetyDepositBox1.BoxSize,
      paymentDueType1: data.SafetyDepositBox1.FeeDuration,
      boxNumber2: data.SafetyDepositBox2.BoxNumber,
      openedOn2: data.SafetyDepositBox2.BoxOpeningDate,
      interestRate2: data.SafetyDepositBox2.Fee,
      size2: data.SafetyDepositBox2.BoxSize,
      paymentDueType2: data.SafetyDepositBox2.FeeDuration,
      address1: data.BankBranchAddress.Line1,
      address2: data.BankBranchAddress.Line2,
      city: data.BankBranchAddress.City,
      state: data.BankBranchAddress.State,
      zip: data.BankBranchAddress.Zip,
      country: data.BankBranchAddress.Country,
      accountType: data.AccountType,
      isLoader: false,
    });
  };

  basicInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
          value={this.state.name}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuing Bank"
          onChangeText={(issuingBank) => this.setState({issuingBank})}
          keyboardType="default"
          value={this.state.issuingBank}
          color={Color.lightishBlue}
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
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Account Number"
          onChangeText={(accountNumber) => this.setState({accountNumber})}
          keyboardType="number-pad"
          value={this.state.accountNumber}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Bank Routing Number"
          onChangeText={(bankRoutingNumber) =>
            this.setState({bankRoutingNumber})
          }
          keyboardType="number-pad"
          value={this.state.bankRoutingNumber}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={(userName) => this.setState({userName})}
          keyboardType="default"
          value={this.state.userName}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
          value={this.state.password}
          color={Color.lightishBlue}
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
          keyboardType="number-pad"
          value={this.state.atm1CardNo}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card PIN"
          onChangeText={(atm1CardPin) => this.setState({atm1CardPin})}
          keyboardType="number-pad"
          value={this.state.atm1CardPin}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(atm1CardExDate) => this.setState({atm1CardExDate})}
            keyboardType="default"
            value={this.state.atm1CardExDate}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(atm1CVV) => this.setState({atm1CVV})}
            keyboardType="number-pad"
            value={this.state.atm1CVV}
            color={Color.lightishBlue}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card Number"
          onChangeText={(atm2CardNo) => this.setState({atm2CardNo})}
          keyboardType="number-pad"
          value={this.state.atm2CardNo}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="ATM Card PIN"
          onChangeText={(atm2CardPin) => this.setState({atm2CardPin})}
          keyboardType="number-pad"
          value={this.state.atm2CardPin}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(atm2CardExDate) => this.setState({atm2CardExDate})}
            keyboardType="default"
            value={this.state.atm2CardExDate}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(atm2CVV) => this.setState({atm2CVV})}
            keyboardType="number-pad"
            value={this.state.atm2CVV}
            color={Color.lightishBlue}
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
          keyboardType="number-pad"
          value={this.state.debit1CardNo}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card PIN"
          onChangeText={(debit1CardPin) => this.setState({debit1CardPin})}
          keyboardType="number-pad"
          value={this.state.debit1CardPin}
          color={Color.lightishBlue}
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
            value={this.state.debit1CardExDate}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(debit1CVV) => this.setState({debit1CVV})}
            keyboardType="number-pad"
            value={this.state.debit1CVV}
            color={Color.lightishBlue}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card Number"
          onChangeText={(debit2CardNo) => this.setState({debit2CardNo})}
          keyboardType="number-pad"
          value={this.state.debit2CardNo}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Debit Card PIN"
          onChangeText={(debit2CardPin) => this.setState({debit2CardPin})}
          keyboardType="number-pad"
          value={this.state.debit2CardPin}
          color={Color.lightishBlue}
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
            value={this.state.debit2CardExDate}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(debit2CVV) => this.setState({debit2CVV})}
            keyboardType="number-pad"
            value={this.state.debit2CVV}
            color={Color.lightishBlue}
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
          value={this.state.securityQ1}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
          value={this.state.securityA1}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
          value={this.state.securityQ2}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
          value={this.state.securityA2}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
          value={this.state.securityQ3}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
          keyboardType="default"
          value={this.state.securityA3}
          color={Color.lightishBlue}
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
            keyboardType="number-pad"
            value={this.state.boxNumber1}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={this.state.size1.length === 0 ? 'Size' : this.state.size1}
            onPress={() =>
              this.setState({modal: true, array: size, key: 'size1'})
            }
            color={Color.lightishBlue}
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened on"
            onChangeText={(openedOn1) => this.setState({openedOn1})}
            keyboardType="default"
            value={this.state.openedOn1}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Interest Rate"
            onChangeText={(interestRate1) => this.setState({interestRate1})}
            icon="dollar-sign"
            keyboardType="default"
            color={Color.lightishBlue}
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
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Box Number"
            onChangeText={(boxNumber2) => this.setState({boxNumber2})}
            keyboardType="number-pad"
            value={this.state.boxNumber2}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={this.state.size2.length === 0 ? 'Size' : this.state.size2}
            onPress={() =>
              this.setState({modal: true, array: size, key: 'size2'})
            }
            color={Color.lightishBlue}
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened on"
            onChangeText={(openedOn2) => this.setState({openedOn2})}
            keyboardType="default"
            value={this.state.openedOn2}
            color={Color.lightishBlue}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Interest Rate"
            onChangeText={(interestRate2) => this.setState({interestRate2})}
            icon="dollar-sign"
            keyboardType="default"
            color={Color.lightishBlue}
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
          color={Color.lightishBlue}
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
          value={this.state.address1}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          value={this.state.address2}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          value={this.state.city}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          value={this.state.state}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="number-pad"
          value={this.state.zip}
          color={Color.lightishBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.country.length === 0 ? 'Country' : this.state.country
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: this.props.countries.country,
              key: 'country',
            })
          }
          color={Color.lightishBlue}
        />
      </View>
    </View>
  );

  handleClick = () => {
    // this.submit();
    console.log('Button Clicked');
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
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
      country,
      accountType,
      size1,
      size2,
      paymentDueType1,
      paymentDueType2,
    } = this.state;
    const {access_token, navigation, recid} = this.props;
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
      'BankBranchAddress-Country': country,
      AccountType: accountType,
    });
    await createOrUpdateRecord('BankAccounts', recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

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
        <View style={styles.gap} />
        <Text style={styles.title}>ATM Card</Text>
        {this.atmCard()}
        <View style={styles.gap} />
        <Text style={styles.title}>Debit Card</Text>
        {this.debitCard()}
        <View style={styles.gap} />
        <Text style={styles.title}>Security Questions</Text>
        {this.securityQuestions()}
        <View style={styles.gap} />
        <Text style={styles.title}>Safety Deposit Box</Text>
        {this.safetyDepositBox()}
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Information</Text>
        {this.additonalInformation()}
        <View style={styles.gap} />
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

const mapStateToProps = ({save}) => ({
  save,
});

export default connect(mapStateToProps)(BankAccounts);
