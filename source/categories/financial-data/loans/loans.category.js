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
import {refianced} from './loans.list';
import {Color} from '../../../assets/color/color.js';

import styles from './loans.style';

class Loans extends Component {
  initialState = {
    isLoader: false,
    modal: false,
    array: [],
    key: '',
    name: '',
    loanNo: '',
    issuer: '',
    loanAmnt: '',
    interestRate: '',
    url: '',
    username: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    effectiveFrom: '',
    endsOn: '',
    refiance: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
    };
  }

  handleClick = () => {
    this.submit();
  };

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
    await viewRecords('ConsumerLoan', recid, access_token)
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
      name: data.Name,
      loanNo: data.LoanNumber,
      issuer: data.Issuer,
      loanAmnt: data.LoanAmount,
      interestRate: data.InterestRate,
      url: data.URL,
      username: data.WebSiteUsername,
      password: data.WebSitePassword,
      address1: data.PaymentMailingAddress.Line1,
      address2: data.PaymentMailingAddress.Line2,
      city: data.PaymentMailingAddress.City,
      state: data.PaymentMailingAddress.State,
      zip: data.PaymentMailingAddress.Zip,
      country: data.PaymentMailingAddress.Country,
      effectiveFrom: data.StartDate,
      endsOn: data.EndDate,
      refiance: data.Refinanced,
      isLoader: false,
    });
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      loanNo,
      issuer,
      loanAmnt,
      interestRate,
      url,
      username,
      password,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      effectiveFrom,
      endsOn,
      refiance,
    } = this.state;
    const {navigation, access_token, recid} = this.props;
    let data = qs.stringify({
      Name: name,
      LoanNumber: loanNo,
      Issuer: issuer,
      LoanAmount: loanAmnt,
      InterestRate: interestRate,
      URL: url,
      WebSiteUsername: username,
      WebSitePassword: password,
      'PaymentMailingAddress-Line1': address1,
      'PaymentMailingAddress-Line2': address2,
      'PaymentMailingAddress-City': city,
      'PaymentMailingAddress-State': state,
      'PaymentMailingAddress-Zip': zip,
      'PaymentMailingAddress-Country': country,
      StartDate: effectiveFrom,
      EndDate: endsOn,
      Refinanced: refiance,
    });
    await createOrUpdateRecord('ConsumerLoan', recid, data, access_token)
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
          color={Color.lightishBlue}
          value={this.state.name}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Loan Number"
          onChangeText={(loanNo) => this.setState({loanNo})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.loanNo}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.issuer}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Loan Amount"
          icon="dollar-sign"
          onChangeText={(loanAmnt) => this.setState({loanAmnt})}
          color={Color.lightishBlue}
          value={this.state.loanAmnt}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Interest Rate"
          onChangeText={(interestRate) => this.setState({interestRate})}
          icon="percent"
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.interestRate}
        />
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

  refiance = () => (
    <View>
      <View style={[styles.miniInputContainer, {marginRight: 10}]}>
        <ModalPicker
          label={
            this.state.refiance.length === 0 ? 'Refianced' : this.state.refiance
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: refianced,
              key: 'refiance',
            })
          }
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={(effectiveFrom) => this.setState({effectiveFrom})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.effectiveFrom}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Ends On"
            onChangeText={(endsOn) => this.setState({endsOn})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.endsOn}
          />
        </View>
      </View>
    </View>
  );

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value === 'Yes' ? true : false});
  };

  render() {
    const {isLoader, modal, array, key} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Basic Information</Text>
        {this.basicInformation()}
        <View style={styles.gap} />
        <Text style={styles.title}>Payment mailing address</Text>
        {this.paymentMailingAddress()}
        <View style={styles.gap} />
        <Text style={styles.title}>Refiance</Text>
        {this.refiance()}
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

export default Loans;
