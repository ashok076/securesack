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
import {term, refiance_repayment} from './mortgages.list';
import {Color} from '../../../assets/color/color.js';

import styles from './mortgages.style';

class Mortgages extends Component {
  initialState = {
    isLoader: false,
    modal: false,
    array: [],
    key: '',
    name: '',
    loanNo: '',
    issuer: '',
    loanAmnt: '',
    mortgageRate: '',
    effectivefrom: '',
    endsOn: '',
    url: '',
    username: '',
    password: '',
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
    term: '',
    refiance: '',
    repayment: '',
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
    await viewRecords('Mortgage', recid, access_token)
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
      mortgageRate: data.InterestRate,
      effectivefrom: data.StartDate,
      endsOn: Edata.ndDate,
      url: data.URL,
      username: data.WebSiteAccountNumber,
      password: data.WebSitePassword,
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
      term: data.Term,
      refiance: data.Refinanced ? 'Yes' : 'No',
      repayment: data.repayment ? 'Yes' : 'No',
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
      mortgageRate,
      effectivefrom,
      endsOn,
      url,
      username,
      password,
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
      term,
      refiance,
      repayment,
    } = this.state;

    const {access_token, navigation, recid} = this.props;

    let data = qs.stringify({
      Name: name,
      LoanNumber: loanNo,
      Issuer: issuer,
      LoanAmount: loanAmnt,
      InterestRate: mortgageRate,
      StartDate: effectivefrom,
      EndDate: endsOn,
      URL: url,
      WebSiteAccountNumber: username,
      WebSitePassword: password,
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
      Term: term,
      Refinanced: refiance === 'Yes' ? true : false,
      repayment: repayment === 'Yes' ? true : false,
    });

    await createOrUpdateRecord('Mortgage', recid, data, access_token)
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
        <ModalPicker
          label={this.state.term.length === 0 ? 'Term' : this.state.term}
          onPress={() =>
            this.setState({
              modal: true,
              array: term,
              key: 'term',
            })
          }
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
          placeholder="Mortgage Rate"
          onChangeText={(mortgageRate) => this.setState({mortgageRate})}
          icon="percent"
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.mortgageRate}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={(effectivefrom) => this.setState({effectivefrom})}
            keyboardType="default"
            color={Color.lightishBlue}
          value={this.state.effectivefrom}
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

  additionalInformation = () => (
    <View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label={
              this.state.refiance.length === 0
                ? 'Refianced'
                : this.state.refiance
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: refiance_repayment,
                key: 'refiance',
              })
            }
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={
              this.state.repayment.length === 0
                ? 'Prepayment Penalty'
                : this.state.repayment
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: refiance_repayment,
                key: 'refiance',
              })
            }
          />
        </View>
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
        <View style={styles.gap} />
        <Text style={styles.title}>Security Questions</Text>
        {this.securityQuestions()}
        <View style={styles.gap} />
        <Text style={styles.title}>Payment Mailing Address</Text>
        {this.paymentMailingAddress()}
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()}
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

export default Mortgages;
