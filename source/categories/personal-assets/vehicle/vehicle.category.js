import React, {Component} from 'react';
import {  View,
  ScrollView,
  Modal,
  ImageBackground,
  SafeAreaView,
  Alert
} from 'react-native';
import {Text} from 'react-native-paper';
import qs from 'qs';
import {connect} from 'react-redux'
import {Root} from 'native-base';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component';
import ModalPicker from '../../../components/modal-picker/modal-picker.component';
import TitleView from '../../../components/title-view/title-view.component';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
} from '../../../configuration/api/api.functions';
import {vehicle_type, engine_type, is_still_owned} from './vehicle.list';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import {Color} from '../../../assets/color/color';

import styles from './vehicle.style';

class Vehicle extends Component {
  initialState = {
      isLoader: false,
      editable: true,
      access_token: '',
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
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.addListener('focus', () => {
      this.setState(this.initialState);
      if (this.props.userData && this.props.userData.userData)
        this.setState(
          {
            access_token: this.props.userData.userData.access_token,
          },
          () => this.viewRecord(),
        );
    });
  }

  viewRecord = async () => {
    const {recid, mode} = this.props.route.params;
    this.setState({isLoader: true});
    await viewRecords(
      'Vehicle',
      recid,
      this.props.userData.userData.access_token,
    )
      .then((response) => {
        console.log('View res: ', response);
        this.setViewData(response.data);
        this.setState({isLoader: false});
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
    this.setState({isLoader: false});
    if (mode === 'Add') this.setState({editable: false, hideResult: false});
  };

  setViewData = (data) => {
    console.log('Data: ', data);
    this.setState(
      {
      make: data.Make,
      model: data.Model,
      licensePlate: data.LicensePlateNumber,
      vin: data.VehicleID,
      vehicleType: data.AutomobileType,
      renewalDate: data.RegistrationValidTill,
      engineType: data.EngineType,
      color: data.Color,
      numOfDoors: data.NumberOfDoors,
      boughtOn: data.DateAcquired,
      soldOn: data.DateReleased,
      isStillOwned: data.IsOwned ? 'Yes' : 'No',
      });
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      access_token,
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
    const {navigation, route} = this.props;
    const {recid} = route.params;
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
      IsOwned: isStillOwned === 'Yes' ? true : false,
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

  delete = async () => {
    const {navigation, route} = this.props;
    const {recid} = route.params;
    await deleteRecords(
      'Vehicle',
      recid,
      this.props.userData.userData.access_token,
    )
      .then((response) => navigation.goBack())
      .catch((error) => console.log('Error in delete', error));
  };

  archive = async () => {
    this.setState({isLoader: true});
    const {navigation, route} = this.props;
    const {recid} = route.params;
    let data = qs.stringify({
      IsArchived: true,
    });
    await archiveRecords(
      'Vehicle',
      recid,
      this.props.userData.userData.access_token,
      data,
    )
      .then((response) => {
        this.setState({isLoader: false});
        console.log('Response', response);
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
        console.log('Error in delete', error);
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
          color={Color.veryLightBlue}
          editable={this.state.editable}
          name="Engine Type"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Color"
          onChangeText={(color) => this.setState({color})}
          keyboardType="default"
          color={Color.paleRed}
            value={this.state.color}
            editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Number of Doors"
          onChangeText={(numOfDoors) => this.setState({numOfDoors})}
          keyboardType="default"
          color={Color.paleRed}
            value={this.state.numOfDoors}
            editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Bought On"
            onChangeText={(boughtOn) => this.setState({boughtOn: formatDate(boughtOn)})}
            keyboardType="default"
            color={Color.paleRed}
            value={this.state.boughtOn}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Sold On"
            onChangeText={(soldOn) => this.setState({soldOn: formatDate(soldOn)})}
            keyboardType="default"
            color={Color.paleRed}
            value={this.state.soldOn}
            editable={this.state.editable}
            example="DD/MM/YYYY"
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
          color={Color.veryLightBlue}
          editable={this.state.editable}
          name="Is still owned?"
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
            value={this.state.make}
            editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Model"
          onChangeText={(model) => this.setState({model})}
          keyboardType="default"
          color={Color.paleRed}
            value={this.state.model}
            editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="License Plate"
          onChangeText={(licensePlate) => this.setState({licensePlate})}
          keyboardType="default"
          color={Color.paleRed}
            value={this.state.licensePlate}
            editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="VIN"
          onChangeText={(vin) => this.setState({vin})}
          keyboardType="default"
          color={Color.paleRed}
            value={this.state.vin}
            editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Registration Renewal Date"
            onChangeText={(renewalDate) => this.setState({renewalDate: formatDate(renewalDate)})}
            keyboardType="default"
          color={Color.paleRed}
            value={this.state.renewalDate}
            editable={this.state.editable}
            example="DD/MM/YYYY"
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
          color={Color.veryLightBlue}
          editable={this.state.editable}
          name="Vehicle Type"
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

  editComponent = (isLoader, modal, array, key, editable) => (
    <View>
      <Text style={styles.title}>Basic Information</Text>
        {this.basicInformation()}
        <View style={styles.gap} />
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()}
        <View style={styles.gap} />
        <Loader isLoader={isLoader} />
        <ModalScreen
          isModalVisible={modal}
          list={array}
          changeModalVisibility={this.changeModalVisibility}
          id={key}
          changeState={this.changeState}
        />
    </View>
  )

  onSave = () => {
    this.submit();
  };

  onEdit = () => {
    this.setState({editable: false}, () => console.log(this.state.editable));
  };

  onDelete = () => {
    Alert.alert(
      //title
      'Delete',
      //body
      'Are you sure you want to delete ?',
      [
        {text: 'Yes', onPress: () => this.delete()},
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  onArchive = () => {
    this.archive();
  };

  render() {
    const {isLoader, modal, array, key, editable} = this.state;
    const {route, navigation} = this.props;
    const {title, type, background, theme, mode} = route.params;
    return (
      <Root>
        <SafeAreaView style={styles.outerView}>
          <ImageBackground source={background} style={styles.backgroundImage}>
            <View style={styles.titleView}>
              <TitleView
                navigation={navigation}
                mode={mode}
                theme={theme}
                title={title}
                type={type}
                save={this.onSave}
                edit={this.onEdit}
                delete={this.onDelete}
                archive={this.onArchive}
                editable={editable}
              />
            </View>
            <ScrollView
              ref={(ref) => (this.scroll = ref)}
              onContentSizeChange={() => {
                this.scroll.scrollTo({y: 0});
              }}
              style={styles.outerContainerView}
              keyboardShouldPersistTaps="handled">
              <View style={styles.container}>
                {this.editComponent(isLoader, modal, array, key, editable)}
              </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </Root>
    );
  }
}

const mapStateToProps = ({ userData }) => ({
  userData
})

export default connect(mapStateToProps)(Vehicle);
