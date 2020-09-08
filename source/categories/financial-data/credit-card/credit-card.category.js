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
import {
  createOrUpdateRecord,
  viewRecords,
} from '../../../configuration/api/api.functions';
import {credit_card_type} from './credit-card.list';
import {Color} from '../../../assets/color/color.js';

import styles from './credit-card.style';

class CreditCard extends Component {
  initialState = {
    isLoader: false,
    modal: false,
    array: [],
    key: '',
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
    country: '',
    creditCardType: '',
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
    await viewRecords('CreditCard', recid, access_token)
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
    console.log("Data: ", data)
    this.setState({
      name: data.Name,
      cardHolderName: data.PrimaryCardHolder,
      cardNo: data.CardNumber,
      expiryDate: data.ExpirationDate,
      cvv: data.CreditCardVerificationValue,
      url: data.URL,
      username: data.WebSiteAccountNumber,
      password: data.WebSitePassword,
      cardHolderName2: data.AdditionalCardHolder,
      cardNo2: data.AdditionalCardNumber,
      expiryDate2: data.AdditionalCardExpirationDate,
      cvv2: data.AdditionalCreditCardVerificationValue,
      securityQ1: data.SecurityQuestion1,
      securityA1: data.SecurityAnswer1,
      securityQ2: data.SecurityQuestion2,
      securityA2: data.SecurityAnswer2,
      securityQ3: data.SecurityQuestion3,
      securityA3: data.SecurityAnswer3,
      address1: data.PaymentMailingAddress.Line1,
      address2: data.PaymentMailingAddress.Line2,
      city: data.PaymentMailingAddress.City,
      state: data.PaymentMailingAddress.State,
      zip: data.PaymentMailingAddress.Zip,
      country: data.PaymentMailingAddress.Country,
      creditCardType: data.CreditCardType,
      isLoader: false,
    });
  };

  handleClick = () => {
    this.submit();
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
      country,
      creditCardType,
    } = this.state;
    const {access_token, navigation, recid} = this.props;
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
      'PaymentMailingAddress-Country': country,
      CreditCardType: creditCardType,
    });
    await createOrUpdateRecord('CreditCard', recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  primaryCard = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.name}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={(cardHolderName) => this.setState({cardHolderName})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardHolderName}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.creditCardType.length === 0
              ? 'Type'
              : this.state.creditCardType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: credit_card_type,
              key: 'creditCardType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo) => this.setState({cardNo})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardNo}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate) => this.setState({expiryDate})}
            keyboardType="default"
            color={Color.lightishBlue}
          value={this.state.expiryDate}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv) => this.setState({cvv})}
            keyboardType="default"
            color={Color.lightishBlue}
          value={this.state.cvv}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.url}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.username}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.password}
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
          color={Color.lightishBlue}
          value={this.state.cardHolderName2}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo2) => this.setState({cardNo2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardNo2}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate2) => this.setState({expiryDate2})}
            keyboardType="default"
            color={Color.lightishBlue}
          value={this.state.expiryDate2}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv2) => this.setState({cvv2})}
            keyboardType="default"
            color={Color.lightishBlue}
          value={this.state.cvv2}
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
          color={Color.lightishBlue}
          value={this.state.securityQ1}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA1}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ2}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA2}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ3}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA3}
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
          color={Color.lightishBlue}
          value={this.state.address1}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.address2}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.city}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.state}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.zip}
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
        />
      </View>
    </View>
  );

  // additionalInformation = () => (
  //   <View>
  //     <View style={styles.inputContainer}>
  //       <InputTextIconDynamic
  //         placeholder="Credit Limit"
  //         onChangeText={this.handleFirstNaame}
  //         icon="dollar-sign"
  //         keyboardType="default"
  //         color={Color.lightishBlue}
  //         value={this.state.address1}
  //       />
  //     </View>
  //     <View style={styles.inputContainer}>
  //       <InputTextDynamic
  //         placeholder="APR"
  //         onChangeText={this.handleFirstNaame}
  //         keyboardType="default"
  //         color={Color.lightishBlue}
  //         value={this.state.address1}
  //       />
  //     </View>
  //     <View style={styles.inputContainer}>
  //       <InputTextIconDynamic
  //         placeholder="Monthly Payment Date"
  //         onChangeText={this.handleFirstNaame}
  //         icon="percent"
  //         keyboardType="default"
  //         color={Color.lightishBlue}
  //         value={this.state.address1}
  //       />
  //     </View>
  //   </View>
  // );

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
        <Text style={styles.title}>Primary Card</Text>
        {this.primaryCard()}
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Card Information</Text>
        {this.additionalCardInfo()}
        <View style={styles.gap} />
        <Text style={styles.title}>Security Questions</Text>
        {this.securityQuestions()}
        <View style={styles.gap} />
        <Text style={styles.title}>Payment Mailing Address</Text>
        {this.paymentMailingAddress()}
        <View style={styles.gap} />
        {/* <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()} */}
        <View style={styles.gap} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Next" />
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

export default CreditCard;
