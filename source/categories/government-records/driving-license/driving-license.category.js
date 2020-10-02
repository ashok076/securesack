import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Modal,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Text} from 'react-native-paper';
import qs from 'qs';
import {connect} from 'react-redux';
import {Root} from 'native-base';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import TitleView from '../../../components/title-view/title-view.component';
import ModalScreen from '../../../components/modal/modal.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
} from '../../../configuration/api/api.functions';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import {Color} from '../../../assets/color/color.js';

import styles from './driving-license.style';

class DriverLicense extends Component {
  initialState = {
    isLoader: false,
    editable: true,
    access_token: '',
    name: '',
    countryOfIssue: '',
    stateOfIssue: '',
    license: '',
    dateOfIssue: '',
    expiryDate: '',
    noOfDrivingVoilation: '',
    drivingViolationType1: '',
    drivingViolationType2: '',
    modal: '',
    array: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
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
      'DriverLicense',
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
    this.setState({
      name: data.Name,
      countryOfIssue: data.CountryOfIssue,
      stateOfIssue: data.StateOfIssue,
      license: data.LicenseNumber,
      dateOfIssue: data.DateOfIssue,
      expiryDate: data.ExpirationDate,
      noOfDrivingVoilation: data.DrivingViolation,
      drivingViolationType1: data.DrivingViolationType1,
      drivingViolationType2: data.DrivingViolationType2,
    });
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
    } = this.state;

    const {navigation, route} = this.props;
    const {recid} = route.params;

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

  delete = async () => {
    const {navigation, route} = this.props;
    const {recid} = route.params;
    await deleteRecords(
      'DriverLicense',
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
      'DriverLicense',
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
          value={this.state.noOfDrivingVoilation}
          editable={this.state.editable}
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
          value={this.state.drivingViolationType1}
          editable={this.state.editable}
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
          value={this.state.drivingViolationType2}
          editable={this.state.editable}
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
          value={this.state.name}
          editable={this.state.editable}
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
              array: this.props.country.country,
              key: 'countryOfIssue',
            })
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Country of Issue"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State of Issue"
          onChangeText={(stateOfIssue) => this.setState({stateOfIssue})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.stateOfIssue}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="License #"
          onChangeText={(license) => this.setState({license})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.license}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue) =>
              this.setState({dateOfIssue: formatDate(dateOfIssue)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.dateOfIssue}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate) =>
              this.setState({expiryDate: formatDate(expiryDate)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.expiryDate}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
      </View>
    </View>
  );

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  editComponent = (isLoader, modal, array, key, editable) => (
    <View>
      <Text style={styles.title}>Basic Information</Text>
      {this.basicInformation()}
      <View style={styles.gap} />
      <Text style={styles.title}>Driving Violations</Text>
      {this.drivingVoilations()}
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
  );

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
              style={[
                styles.outerContainerView,
                {
                  backgroundColor:
                    theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)',
                },
              ]}
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

const mapStateToProps = ({userData, country}) => ({
  userData,
  country,
});

export default connect(mapStateToProps)(DriverLicense);
