import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import {
  createOrUpdateRecord,
  viewRecords,
} from '../../../configuration/api/api.functions';
import {Color} from '../../../assets/color/color.js';

import styles from './brokerages.style';

class Brokerages extends Component {
  initialState = {
    isLoader: false,
    name: '',
    financialInstitution: '',
    acNumber: '',
    username: '',
    password: '',
    url: '',
    primaryAcHolder: '',
    joinAcHolderOne: '',
    joinAcHolderTwo: '',
    securityQ1: '',
    securityA1: '',
    securityQ2: '',
    securityA2: '',
    securityQ3: '',
    securityA3: '',
    stockTransactionFee: '',
    openedOn: '',
    closedOn: '',
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
    await viewRecords('BrokerageAccount', recid, access_token)
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
      name: data.BrokerageName,
      financialInstitution: data.FinancialInstitution,
      acNumber: data.AccountNumber,
      username: data.WebSiteAccountNumber,
      password: data.WebSitePassword,
      url: data.URL,
      primaryAcHolder: data.PrimaryAccountHolder,
      joinAcHolderOne: data.AdditionalAccountHolder1,
      joinAcHolderTwo: data.AdditionalAccountHolder2,
      securityQ1: data.SecurityQuestion1,
      securityA1: data.SecurityAnswer1,
      securityQ2: data.SecurityQuestion2,
      securityA2: data.SecurityAnswer2,
      securityQ3: data.SecurityQuestion3,
      securityA3: data.SecurityAnswer3,
      stockTransactionFee: data.StockTransactionFee,
      openedOn: data.AccountOpeningDate,
      closedOn: data.AccountClosingDate,
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
      financialInstitution,
      acNumber,
      username,
      password,
      url,
      primaryAcHolder,
      joinAcHolderOne,
      joinAcHolderTwo,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      stockTransactionFee,
      openedOn,
      closedOn,
    } = this.state;
    const {access_token, navigation, recid} = this.props;
    let data = qs.stringify({
      BrokerageName: name,
      FinancialInstitution: financialInstitution,
      AccountNumber: acNumber,
      WebSiteAccountNumber: username,
      WebSitePassword: password,
      URL: url,
      PrimaryAccountHolder: primaryAcHolder,
      AdditionalAccountHolder1: joinAcHolderOne,
      AdditionalAccountHolder2: joinAcHolderTwo,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      StockTransactionFee: stockTransactionFee,
      AccountOpeningDate: openedOn,
      AccountClosingDate: closedOn,
    });
    await createOrUpdateRecord('BrokerageAccount', recid, data, access_token)
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
          placeholder="Financial Institution"
          onChangeText={(financialInstitution) =>
            this.setState({financialInstitution})
          }
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.financialInstitution}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Account Number"
          onChangeText={(acNumber) => this.setState({acNumber})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.acNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
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
          placeholder="Primary Account Holder"
          onChangeText={(primaryAcHolder) => this.setState({primaryAcHolder})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.primaryAcHolder}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Account Holder 1"
          onChangeText={(joinAcHolderOne) => this.setState({joinAcHolderOne})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.joinAcHolderOne}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Account Holder 2"
          onChangeText={(joinAcHolderTwo) => this.setState({joinAcHolderTwo})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.joinAcHolderTwo}
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

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Stock Transaction Fee"
          onChangeText={(stockTransactionFee) =>
            this.setState({stockTransactionFee})
          }
          icon="dollar-sign"
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.stockTransactionFee}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened On"
            onChangeText={(openedOn) => this.setState({openedOn})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.openedOn}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Closed On"
            onChangeText={(closedOn) => this.setState({closedOn})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.closedOn}
          />
        </View>
      </View>
    </View>
  );

  render() {
    const {isLoader} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Basic Information</Text>
        {this.basicInformation()}
        <View style={styles.gap} />
        <Text style={styles.title}>Security Questions</Text>
        {this.securityQuestions()}
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()}
        <View style={styles.gap} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Next" />
        </View>
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

export default Brokerages;
