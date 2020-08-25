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

import styles from './property.style';

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
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
      name,
      address1,
      address2,
      city,
      state,
      zip,
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
    } = this.state;

    let data = qs.stringify({
      Name: name,
      'Address-Line1': address1,
      'Address-Line2': address2,
      'Address-City': city,
      'Address-State': state,
      'Address-Zip': zip,
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
    });

    await createOrUpdateRecord('Property', `__NEW__`, data, access_token)
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
          <ModalPicker label="Sprinkler Type" onPress={() => alert('Type')} />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker label="Fire Alarm Type" onPress={() => alert('Type')} />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label="Burglar Alarm Type"
            onPress={() => alert('Type')}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker label="Smoke Detectors" onPress={() => alert('Type')} />
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
        <InputTextDynamic
          placeholder="Is the Fire Hydrant Within 1000 Feet?"
          onChangeText={this.handleFirstNaame}
          keyboardType="default"
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
        <ModalPicker label="Purpose" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Residence Type" onPress={() => alert('Type')} />
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
        <ModalPicker label="Account Type" onPress={() => alert('Type')} />
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
        <ModalPicker label="Construction Type" onPress={() => alert('Type')} />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Garage Size"
          onChangeText={(garageSize) => this.setState({garageSize})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker label="Garage Type" onPress={() => alert('Type')} />
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

export default Property;
