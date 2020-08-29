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
import {
  purpose,
  residence_type,
  construction_type,
  garage_type,
  sprinkler_type,
  alarm_type,
  boolean_value,
} from './property.list';

import styles from './property.style';

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      recid: props.recid,
      modal: '',
      array: [],
      key: '',
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      boughtOn: '',
      houseSize: '',
      lotSize: '',
      county: '',
      schoolDistrict: '',
      apn: '',
      propertyTaxAmnt: '',
      yearOfConstruction: '',
      age: '',
      numberOfLevels: '',
      garageSize: '',
      respondingFireDepartment: '',
      distanceToFireDepartment: '',
      soldOn: '',
      purpose: '',
      residenceType: '',
      constructionType: '',
      garageType: '',
      sprinklerType: '',
      fireAlarmType: '',
      burgularAlarmType: '',
      smokeDetector: '',
      isFireHydrant: '',
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
      navigation,
      access_token,
      recid,
      name,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      boughtOn,
      houseSize,
      lotSize,
      county,
      schoolDistrict,
      apn,
      propertyTaxAmnt,
      yearOfConstruction,
      age,
      numberOfLevels,
      garageSize,
      respondingFireDepartment,
      distanceToFireDepartment,
      soldOn,
      purpose,
      residenceType,
      constructionType,
      garageType,
      sprinklerType,
      fireAlarmType,
      burgularAlarmType,
      smokeDetector,
      isFireHydrant,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      'Address-Line1': address1,
      'Address-Line2': address2,
      'Address-City': city,
      'Address-State': state,
      'Address-Zip': zip,
      'Address-Country': country,
      StartDate: boughtOn,
      HouseSize: houseSize,
      LotSize: lotSize,
      County: county,
      SchoolDistrict: schoolDistrict,
      APN: apn,
      PropertyTaxAmount: propertyTaxAmnt,
      YearOfConstruction: yearOfConstruction,
      Age: age,
      NumberOfLevels: numberOfLevels,
      GarageSize: garageSize,
      RespondingFireDepartment: respondingFireDepartment,
      DistanceToNearestFireDepartment: distanceToFireDepartment,
      EndDate: soldOn,
      PropertyType: purpose,
      ResidenceType: residenceType,
      ConstructionType: constructionType,
      GarageType: garageType,
      SprinklerType: sprinklerType,
      FireAlarmType: fireAlarmType,
      BurglarAlarmType: burgularAlarmType,
      HasSmokeDetectors: smokeDetector,
      IsFireHydrantWithinThousandFeet: isFireHydrant,
    });

    await createOrUpdateRecord('Property', recid, data, access_token)
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
        return this.propertyDetails();
        break;
      case 2:
        return this.additionalInformation();
        break;
    }
  };

  additionalInformation = () => (
    <View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label={
              this.state.sprinklerType.length === 0
                ? 'Sprinkler Type'
                : this.state.sprinklerType
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: sprinkler_type,
                key: 'sprinklerType',
              })
            }
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={
              this.state.fireAlarmType.length === 0
                ? 'Fire Alarm Type'
                : this.state.fireAlarmType
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: alarm_type,
                key: 'fireAlarmType',
              })
            }
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label={
              this.state.burgularAlarmType.length === 0
                ? 'Burglar Alarm Type'
                : this.state.burgularAlarmType
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: alarm_type,
                key: 'burgularAlarmType',
              })
            }
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={
              this.state.smokeDetector.length === 0
                ? 'Smoke Detectors'
                : this.state.smokeDetector
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: boolean_value,
                key: 'smokeDetector',
              })
            }
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Responding Fire Department"
          onChangeText={(respondingFireDepartment) =>
            this.setState({respondingFireDepartment})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Distance To Fire Department"
          onChangeText={(distanceToFireDepartment) =>
            this.setState({distanceToFireDepartment})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.isFireHydrant.length === 0
              ? 'Is the Fire Hydrant Within 1000 Feet?'
              : this.state.isFireHydrant
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: boolean_value,
              key: 'isFireHydrant',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Sold On"
          onChangeText={(soldOn) => this.setState({soldOn})}
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
            this.state.purpose.length === 0 ? 'Purpose' : this.state.purpose
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: purpose,
              key: 'purpose',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.residenceType.length === 0
              ? 'Residance Type'
              : this.state.residenceType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: residence_type,
              key: 'residenceType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={(address1) => this.setState({address1})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
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
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Bought On"
          onChangeText={(boughtOn) => this.setState({boughtOn})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="House Size"
          onChangeText={(houseSize) => this.setState({houseSize})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Lot Size"
          onChangeText={(lotSize) => this.setState({lotSize})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="County"
          onChangeText={(county) => this.setState({county})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="School District"
          onChangeText={(schoolDistrict) => this.setState({schoolDistrict})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="APN #"
          onChangeText={(apn) => this.setState({apn})}
          keyboardType="default"
        />
      </View>
    </View>
  );

  propertyDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Property Tax Amount"
          onChangeText={(propertyTaxAmnt) => this.setState({propertyTaxAmnt})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Year of Construction"
          onChangeText={(yearOfConstruction) =>
            this.setState({yearOfConstruction})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Age"
          onChangeText={(age) => this.setState({age})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Number of Levels"
          onChangeText={(numberOfLevels) => this.setState({numberOfLevels})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.constructionType.length === 0
              ? 'Construction Type'
              : this.state.constructionType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: construction_type,
              key: 'constructionType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Garage Size"
          onChangeText={(garageSize) => this.setState({garageSize})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.garageType.length === 0
              ? 'Garage Type'
              : this.state.garageType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: garage_type,
              key: 'garageType',
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
        return 'Property Details';
        break;
      case 2:
        return 'Additional Information';
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

export default Property;
