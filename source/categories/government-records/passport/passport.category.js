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

import styles from './passport.style';

class Passport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      recid: props.recid,
      name: '',
      countryofIssue: '',
      passportNo: '',
      dateOfIssue: '',
      expirationDate: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      oldPassportNo1: '',
      placeOfIssue1: '',
      dateOfIssue1: '',
      expiredOn2: '',
      oldPassportNo2: '',
      placeOfIssue2: '',
      dateOfIssue2: '',
      expiredOn2: '',
    };
  }

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      countryofIssue,
      passportNo,
      dateOfIssue,
      expirationDate,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      oldPassportNo1,
      placeOfIssue1,
      dateOfIssue1,
      expiredOn1,
      oldPassportNo2,
      placeOfIssue2,
      dateOfIssue2,
      expiredOn2,
      access_token,
      navigation,
      recid,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      CountryOfIssue: countryofIssue,
      PassportNumber: passportNo,
      DateOfIssue: dateOfIssue,
      ExpirationDate: expirationDate,
      'HomeAddressOnPassport-Line1': address1,
      'HomeAddressOnPassport-Line2': address2,
      'HomeAddressOnPassport-City': city,
      'HomeAddressOnPassport-State': state,
      'HomeAddressOnPassport-Zip': zip,
      'HomeAddressOnPassport-Country': country,
      PreviousPassportNumber1: oldPassportNo1,
      PreviousPlaceOfIssue1: placeOfIssue1,
      PreviousDateOfIssue1: dateOfIssue1,
      PreviousExpirationDate1: expiredOn2,
      PreviousPassportNumber2: oldPassportNo2,
      PreviousPlaceOfIssue2: placeOfIssue2,
      PreviousDateOfIssue2: dateOfIssue2,
      PreviousExpirationDate2: expiredOn2,
    });

    await createOrUpdateRecord('Passport', recid, data, access_token)
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
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.countryofIssue.length === 0
              ? 'Country of Issue'
              : this.state.countryofIssue
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: this.state.countries,
              key: 'countryofIssue',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Passport Number"
          onChangeText={(passportNo) => this.setState({passportNo})}
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

  additionalInfo = () => (
    <View>
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

  previousPassports = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Old Passport Number 1"
          onChangeText={(oldPassportNo1) => this.setState({oldPassportNo1})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={(placeOfIssue1) => this.setState({placeOfIssue1})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue1) => this.setState({dateOfIssue1})}
            keyboardType="default"
          color={Color.salmon}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expired On"
            onChangeText={(expiredOn2) => this.setState({expiredOn2})}
            keyboardType="default"
          color={Color.salmon}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Old Passport Number 2"
          onChangeText={(oldPassportNo2) => this.setState({oldPassportNo2})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={(placeOfIssue2) => this.setState({placeOfIssue2})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue2) => this.setState({dateOfIssue2})}
            keyboardType="default"
          color={Color.salmon}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expired On"
            onChangeText={(expiredOn2) => this.setState({expiredOn2})}
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
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInfo()}
        <View style={styles.gap} />
        <Text style={styles.title}>Previous Passports</Text>
        {this.previousPassports()}
        <View style={styles.gap} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Submit" />
        </View>
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

export default Passport;
