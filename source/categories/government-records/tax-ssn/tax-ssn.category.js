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

import styles from './tax-ssn.style';

class TaxSSN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      name: '',
      ssn: '',
      taxFillingNumber: '',
      softwareName: '',
      url: '',
      username: '',
      password: '',
      dob: '',
      citizenship: '',
      tob: '',
      sob: '',
      cob: '',
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
      ssn,
      taxFillingNumber,
      softwareName,
      url,
      username,
      password,
      dob,
      citizenship,
      tob,
      sob,
      cob,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      StateIdentificationNumber: ssn,
      TaxFilingNumber: taxFillingNumber,
      SoftwareName: softwareName,
      URL: url,
      WebsiteUserName: username,
      WebsitePassword: password,
      DateOfBirth: dob,
      Citizenship: citizenship,
      TimeOfBirth: tob,
      StateOfBirth: sob,
      CityOfBirth: cob,
    });

    await createOrUpdateRecord('Passport', `__NEW__`, data, access_token)
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
        return this.taxDetails();
        break;
      case 2:
        return this.birthDetails();
        break;
    }
  };

  taxDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Tax Filing Number"
          onChangeText={(taxFillingNumber) => this.setState({taxFillingNumber})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Marital Status" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Software Used" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Software Name"
          onChangeText={(softwareName) => this.setState({softwareName})}
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

  birthDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Date Of Birth"
          onChangeText={(dob) => this.setState({dob})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Citizenship"
          onChangeText={(citizenship) => this.setState({citizenship})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Time of Birth"
          onChangeText={(tob) => this.setState({tob})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Country of Birth" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State of Birth"
          onChangeText={(sob) => this.setState({sob})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City of Birth"
          onChangeText={(cob) => this.setState({cob})}
          keyboardType="default"
        />
      </View>
    </View>
  );

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
          placeholder="SSN"
          onChangeText={(ssn) => this.setState({ssn})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Gender" onPress={() => alert('Type')} />
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
      case 1:
        return 'Tax Details';
        break;
      case 2:
        return 'Birth Details';
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
            length={3}
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

export default TaxSSN;
