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
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {gender, martial_status, software_used} from './tax-ssn.list';
import {Color} from '../../../assets/color/color.js';

import styles from './tax-ssn.style';

class TaxSSN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      recid: props.recid,
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
    this.submit();
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
      access_token,
      navigation,
      recid
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

    await createOrUpdateRecord('Passport',recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  taxDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Tax Filing Number"
          onChangeText={(taxFillingNumber) => this.setState({taxFillingNumber})}
          keyboardType="default"
          color={Color.salmon}
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
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
          color={Color.salmon}
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
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Citizenship"
          onChangeText={(citizenship) => this.setState({citizenship})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Time of Birth"
          onChangeText={(tob) => this.setState({tob})}
          keyboardType="default"
          color={Color.salmon}
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
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City of Birth"
          onChangeText={(cob) => this.setState({cob})}
          keyboardType="default"
          color={Color.salmon}
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
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="SSN"
          onChangeText={(ssn) => this.setState({ssn})}
          keyboardType="default"
          color={Color.salmon}
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
        <View style={styles.gap}/>
        <Text style={styles.title}>Tax Details</Text>
        {this.taxDetails()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Birth Details</Text>
        {this.birthDetails()}
        <View style={styles.gap}/>
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

export default TaxSSN;
