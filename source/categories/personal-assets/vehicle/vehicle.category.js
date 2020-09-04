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
import {vehicle_type, engine_type, is_still_owned} from './vehicle.list';
import {Color} from '../../../assets/color/color.js';

import styles from './vehicle.style';

class Vehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      recid: props.recid,
      modal: '',
      array: [],
      key: '',
      make: '',
      modal: '',
      licensePlate: '',
      vin: '',
      vehicleType: '',
      renewalDate: '',
      engineType: '',
      color: '',
      numOfDoors: '',
      boughtOn: '',
      soldOn: '',
      isStillOwned: '',
    };
  }

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      navigation,
      access_token,
      recid,
      make,
      model,
      licensePlate,
      vin,
      vehicleType,
      renewalDate,
      engineType,
      color,
      numOfDoors,
      boughtOn,
      soldOn,
      isStillOwned,
    } = this.state;

    let data = qs.stringify({
      Make: make,
      Model: model,
      LicensePlateNumber: licensePlate,
      VehicleID: vin,
      AutomobileType: vehicleType,
      RegistrationValidTill: renewalDate,
      EngineType: engineType,
      Color: color,
      NumberOfDoors: numOfDoors,
      DateAcquired: boughtOn,
      DateReleased: soldOn,
      IsOwned: isStillOwned,
    });

    await createOrUpdateRecord('Vehicle', recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.engineType.length === 0
              ? 'Engine Type'
              : this.state.engineType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: engine_type,
              key: 'engineType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Color"
          onChangeText={(color) => this.setState({color})}
          keyboardType="default"
          color={Color.paleRed}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Number of Doors"
          onChangeText={(numOfDoors) => this.setState({numOfDoors})}
          keyboardType="default"
          color={Color.paleRed}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Bought On"
            onChangeText={(boughtOn) => this.setState({boughtOn})}
            keyboardType="default"
            color={Color.paleRed}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Sold On"
            onChangeText={(soldOn) => this.setState({soldOn})}
            keyboardType="default"
            color={Color.paleRed}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.isStillOwned.length === 0
              ? 'Is still owned?'
              : this.state.isStillOwned
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: is_still_owned,
              key: 'isStillOwned',
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
          placeholder="Make"
          onChangeText={(make) => this.setState({make})}
          keyboardType="default"
          color={Color.paleRed}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Model"
          onChangeText={(modal) => this.setState({modal})}
          keyboardType="default"
          color={Color.paleRed}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="License Plate"
          onChangeText={(licensePlate) => this.setState({licensePlate})}
          keyboardType="default"
          color={Color.paleRed}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="VIN"
          onChangeText={(vin) => this.setState({vin})}
          keyboardType="default"
          color={Color.paleRed}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Registration Renewal Date"
            onChangeText={(renewalDate) => this.setState({renewalDate})}
            keyboardType="default"
          color={Color.paleRed}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={
              this.state.vehicleType.length === 0
                ? 'Vehicle Type'
                : this.state.vehicleType
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: vehicle_type,
                key: 'vehicleType',
              })
            }
          />
        </View>
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
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()}
        <View style={styles.gap} />
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

export default Vehicle;
