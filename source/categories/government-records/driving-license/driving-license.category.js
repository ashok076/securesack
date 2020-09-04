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

import styles from './driving-license.style';

class DriverLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      recid: props.recid,
      name: '',
      countryOfIssue: '',
      stateOfIssue: '',
      license: '',
      dateOfIssue: '',
      expiryDate: '',
      noOfDrivingVoilation: '',
      drivingViolationType1: '',
      drivingViolationType2: '',
    };
  }

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      countryOfIssue,
      stateOfIssue,
      license,
      dateOfIssue,
      expiryDate,
      noOfDrivingVoilation,
      drivingViolationType1,
      drivingViolationType2,
      access_token,
      navigation,
      recid,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      CountryOfIssue: countryOfIssue,
      StateOfIssue: stateOfIssue,
      LicenseNumber: license,
      DateOfIssue: dateOfIssue,
      ExpirationDate: expiryDate,
      DrivingViolation: noOfDrivingVoilation,
      DrivingViolationType1: drivingViolationType1,
      DrivingViolationType2: drivingViolationType2,
    });

    await createOrUpdateRecord('DriverLicense', recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  drivingVoilations = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Number of Driving Violations"
          onChangeText={(noOfDrivingVoilation) =>
            this.setState({noOfDrivingVoilation})
          }
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Driving Violation Type"
          onChangeText={(drivingViolationType1) =>
            this.setState({drivingViolationType1})
          }
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Driving Violation Type"
          onChangeText={(drivingViolationType2) =>
            this.setState({drivingViolationType2})
          }
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
        <ModalPicker
          label={
            this.state.countryOfIssue.length === 0
              ? 'Country of Issue'
              : this.state.countryOfIssue
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: this.state.countries,
              key: 'countryOfIssue',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State of Issue"
          onChangeText={(stateOfIssue) => this.setState({stateOfIssue})}
          keyboardType="default"
          color={Color.salmon}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="License #"
          onChangeText={(license) => this.setState({license})}
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
            onChangeText={(expiryDate) => this.setState({expiryDate})}
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
        <Text style={styles.title}>Driving Violations</Text>
        {this.drivingVoilations()}
        <View style={styles.gap} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Submit" />
        </View>
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

export default DriverLicense;
