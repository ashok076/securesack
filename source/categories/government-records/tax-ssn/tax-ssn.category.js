import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Modal,
  ImageBackground,
  SafeAreaView,
  Alert,
  BackHandler
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
import {gender, martial_status, software_used} from './tax-ssn.list';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import {Color} from '../../../assets/color/color.js';
import CopyClipboard from '../../../components/copy-clipboard/copy-clipboard.component';

import styles from './tax-ssn.style';

class TaxIdentification extends Component {
  initialState = {
    isLoader: false,
    editable: true,
    access_token: '',
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
    countryofbirth: '',
    sob: '',
    cob: '',
    notes: '',
    changes: false
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
    };
  }

  componentDidMount() {
    const {navigation, route} = this.props;
    BackHandler.addEventListener('hardwareBackPress', () => this.onBack());
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

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
}

  viewRecord = async () => {
    const {recid, mode} = this.props.route.params;
    this.setState({isLoader: true});
    await viewRecords(
      'TaxIdentification',
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
    this.setState({
      name: data.Name,
      ssn: data.StateIdentificationNumber,
      gender: data.Gender,
      taxFillingNumber: data.TaxFilingNumber,
      martialStatus: data.MaritalStatus,
      softwareUsed: data.SoftwareUsed ? 'Yes' : 'No',
      softwareName: data.SoftwareName,
      url: data.URL,
      username: data.WebsiteUserName,
      password: data.WebsitePassword,
      dob: data.DateOfBirth,
      citizenship: data.Citizenship,
      tob: data.TimeOfBirth,
      countryofbirth: data.CountryOfBirth,
      sob: data.StateOfBirth,
      cob: data.CityOfBirth,
      notes: data.Comment
    });
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
      notes
    } = this.state;

    const {navigation, route} = this.props;
    const {recid} = route.params;

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
      Comment: notes
    });

    await createOrUpdateRecord('TaxIdentification', recid, data, access_token)
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
      'TaxIdentification',
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
      'TaxIdentification',
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

  taxDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Tax Filing Number"
          onChangeText={(taxFillingNumber) => this.setState({taxFillingNumber}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.taxFillingNumber}
          editable={this.state.editable}
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
              array: martial_status,
              key: 'martialStatus',
            }, () => this.changesMade())
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Martial Status"
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
            }, () => this.changesMade())
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Software Used"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Software Name"
          onChangeText={(softwareName) => this.setState({softwareName}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.softwareName}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.url}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.username}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.password}
          editable={this.state.editable}
        />
      </View>
    </View>
  );

  birthDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Date Of Birth"
          onChangeText={(dob) => this.setState({dob: formatDate(dob)}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.dob}
          editable={this.state.editable}
          example="DD/MM/YYYY"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Citizenship"
          onChangeText={(citizenship) => this.setState({citizenship}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.citizenship}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Time of Birth"
          onChangeText={(tob) => this.setState({tob}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.tob}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.countryofbirth.length === 0
              ? 'Country of Birth'
              : this.state.countryofbirth
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: this.props.country.country,
              key: 'countryofbirth',
            }, () => this.changesMade())
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Country of Birth"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State of Birth"
          onChangeText={(sob) => this.setState({sob}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.sob}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City of Birth"
          onChangeText={(cob) => this.setState({cob}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.cob}
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
          onChangeText={(name) => this.setState({name}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="SSN"
          onChangeText={(ssn) => this.setState({ssn}, () => this.changesMade())}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.ssn}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard text={this.state.ssn} editable={this.state.editable} />
        </View>
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
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Gender"
        />
      </View>
    </View>
  );

  notes = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Notes"
          onChangeText={(notes) => this.setState({notes}, () => this.changesMade() )}
          keyboardType="default"
          value={this.state.notes}
          color={Color.salmon}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.notes}
            editable={this.state.editable}
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

changesMade = () => {
  const {mode} = this.props.route.params;
  const {editable} = this.state;
  if (!editable) this.setState({ changes: true }, () => console.log("Check: "));
}

  editComponent = (isLoader, modal, array, key, editable) => (
    <View>
      <Text style={styles.title}>Basic Information</Text>
      {this.basicInformation()}
      <View style={styles.gap} />
      <Text style={styles.title}>Tax Details</Text>
      {this.taxDetails()}
      <View style={styles.gap} />
      <Text style={styles.title}>Birth Details</Text>
      {this.birthDetails()}
      <Text style={styles.title}>Notes</Text>
      {this.notes()}
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

  onBack = () => {
    const {navigation} = this.props;
    const {changes} = this.state;
    if (changes){
      Alert.alert(
      //title
      'Save',
      //body
      'Do you want to save changes ?',
      [
        {text: 'Save', onPress: () => this.submit()},
        {text: 'Cancel', onPress: () => navigation.goBack(), style: 'cancel'},
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
    }else {
      navigation.goBack();
    }
    return true
  }

  background = () =>
    require('../../../assets/jpg-images/Government-Record-Background/government-records-background.jpg');

  render() {
    const {isLoader, modal, array, key, editable} = this.state;
    const {route, navigation} = this.props;
    const {title, type, mode} = route.params;
    return (
      <Root>
        <SafeAreaView style={styles.outerView}>
          <ImageBackground
            source={this.background()}
            style={styles.backgroundImage}>
            <View style={styles.titleView}>
              <TitleView
                navigation={navigation}
                mode={mode}
                theme={'light'}
                title={title}
                type={type}
                save={this.onSave}
                edit={this.onEdit}
                delete={this.onDelete}
                archive={this.onArchive}
                backpress={this.onBack}
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

const mapStateToProps = ({userData, country}) => ({
  userData,
  country,
});

export default connect(mapStateToProps)(TaxIdentification);
