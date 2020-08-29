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
import {gender, martial_status, software_used} from './tax-ssn.list';

import styles from './tax-ssn.style';

class TaxSSN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      modal: '',
      array: [],
      key: '',
      name: '',
      ssn: '',
      gender: '',
      taxFillingNumber: '',
      martialStatus: '',
      softwareUsed: '',
      softwareName: '',
      url: '',
      username: '',
      password: '',
      dob: '',
      citizenship: '',
      tob: '',
      cuntryofbirth: '',
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
      gender,
      taxFillingNumber,
      martialStatus,
      softwareUsed,
      softwareName,
      url,
      username,
      password,
      dob,
      citizenship,
      tob,
      countryofbirth,
      sob,
      cob,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      StateIdentificationNumber: ssn,
      Gender: gender,
      TaxFilingNumber: taxFillingNumber,
      MaritalStatus: martialStatus,
      SoftwareUsed: softwareUsed === 'Yes' ? true : false,
      SoftwareName: softwareName,
      URL: url,
      WebsiteUserName: username,
      WebsitePassword: password,
      DateOfBirth: dob,
      Citizenship: citizenship,
      TimeOfBirth: tob,
      CountryOfBirth: countryofbirth,
      StateOfBirth: sob,
      CityOfBirth: cob,
    });

    await createOrUpdateRecord('Passport', `__NEW__`, data, access_token)
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
        <ModalPicker
          label={
            this.state.martialStatus.length === 0
              ? 'Martial Status'
              : this.state.martialStatus
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: gender,
              key: 'martialStatus',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.softwareUsed.length === 0
              ? 'Software Used'
              : this.state.softwareUsed
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: software_used,
              key: 'softwareUsed',
            })
          }
        />
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
        <ModalPicker
          label={
            this.state.countryofbirth.length === 0 ? 'Country of Birth' : this.state.countryofbirth
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: this.state.countries,
              key: 'countryofbirth',
            })
          }
        />
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
        <ModalPicker
          label={this.state.gender.length === 0 ? 'Gender' : this.state.gender}
          onPress={() =>
            this.setState({
              modal: true,
              array: gender,
              key: 'gender',
            })
          }
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
        return 'Tax Details';
        break;
      case 2:
        return 'Birth Details';
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

export default TaxSSN;
