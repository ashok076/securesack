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

import styles from './driving-license.style';

class DriverLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
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
    const {active} = this.state;
    if (active < 1) this.setState({active: active + 1});
    else if (active === 1) this.submit();
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

    await createOrUpdateRecord('DriverLicense', `__NEW__`, data, access_token)
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
        return this.drivingVoilations();
        break;
      case 2:
        break;
    }
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
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Driving Violation Type"
          onChangeText={(drivingViolationType1) =>
            this.setState({drivingViolationType1})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Driving Violation Type"
          onChangeText={(drivingViolationType2) =>
            this.setState({drivingViolationType2})
          }
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
        <ModalPicker
          label={
            this.state.countryOfIssue.length === 0 ? 'Country of Issue' : this.state.countryOfIssue
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
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="License #"
          onChangeText={(license) => this.setState({license})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue) => this.setState({dateOfIssue})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate) => this.setState({expiryDate})}
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
        return 'Driving Violations';
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
            length={2}
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

export default DriverLicense;
