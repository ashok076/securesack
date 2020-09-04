import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {Color} from '../../../assets/color/color.js';

import styles from './identity.style';

class Identity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      recid: props.recid,
      name: '',
      idNo: '',
      issuer: '',
      dateOfIssue: '',
      expirationDate: '',
      placeOfIssue: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    };
  }

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      idNo,
      issuer,
      dateOfIssue,
      expirationDate,
      placeOfIssue,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      access_token,
      navigation,
      recid
    } = this.state;
    let data = qs.stringify({
      IDName: name,
      IDNumber: idNo,
      Issuer: issuer,
      DateOfIssue: dateOfIssue,
      ExpirationDate: expirationDate,
      PlaceOfIssue: placeOfIssue,
      'AddressGiven-Line1': address1,
      'AddressGiven-Line2': address2,
      'AddressGiven-City': city,
      'AddressGiven-State': state,
      'AddressGiven-Zip': zip,
      'AddressGiven-Country': country,
    });

    await createOrUpdateRecord(
      'IdentificationCards',
      recid,
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

  additionalInfo = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={(placeOfIssue) => this.setState({placeOfIssue})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={(address1) => this.setState({address1})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
          color={Color.salmon}
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
              array: this.state.countries,
              key: 'country',
            })
          }
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
          placeholder="ID Number"
          onChangeText={(idNo) => this.setState({idNo})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue) => this.setState({dateOfIssue})}
            keyboardType="default"
          color={Color.salmon}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expirationDate) => this.setState({expirationDate})}
            keyboardType="default"
          color={Color.salmon}
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
        <View style={styles.gap}/>
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInfo()}
        <View style={styles.gap}/>
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Submit" />
        </View>
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

export default Identity;
