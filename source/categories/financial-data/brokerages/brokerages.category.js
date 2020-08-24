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
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';

import styles from './brokerages.style';

class Brokerages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
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
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 2) this.setState({active: active + 1});
    else if (active === 2) this.submit();
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
      access_token,
      navigation
    } = this.state;

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
    await createOrUpdateRecord(
      'BrokerageAccount',
      `__NEW__`,
      data,
      access_token,
    )
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
        return this.securityQuestions();
        break;
      case 2:
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
          placeholder="Financial Institution"
          onChangeText={(financialInstitution) =>
            this.setState({financialInstitution})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Account Number"
          onChangeText={(acNumber) => this.setState({acNumber})}
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
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
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
          placeholder="Joint Account Holder 1"
          onChangeText={(joinAcHolderOne) => this.setState({joinAcHolderOne})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Account Holder 2"
          onChangeText={(joinAcHolderTwo) => this.setState({joinAcHolderTwo})}
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
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened On"
            onChangeText={(openedOn) => this.setState({openedOn})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Closed On"
            onChangeText={(closedOn) => this.setState({closedOn})}
            keyboardType="default"
          />
        </View>
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
      case 1:
        return 'Security Questions';
        break;
      case 2:
        return 'Additional Information';
        break;
    }
  };

  render() {
    const {active, isLoader} = this.state;
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

export default Brokerages;
