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
import {Color} from '../../../assets/color/color.js';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import CopyClipboard from '../../../components/copy-clipboard/copy-clipboard.component';

import styles from './passport.style';

class Passport extends Component {
  initialState = {
    isLoader: false,
    editable: true,
    modal: '',
    array: [],
    access_token: '',
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
      'Passport',
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
      countryofIssue: data.CountryOfIssue,
      passportNo: data.PassportNumber,
      dateOfIssue: data.DateOfIssue,
      expirationDate: data.ExpirationDate,
      address1: data.HomeAddressOnPassport.Line1,
      address2: data.HomeAddressOnPassport.Line2,
      city: data.HomeAddressOnPassport.City,
      state: data.HomeAddressOnPassport.State,
      zip: data.HomeAddressOnPassport.Zip,
      country: data.HomeAddressOnPassport.Country,
      oldPassportNo1: data.PreviousPassportNumber1,
      placeOfIssue1: data.PreviousPlaceOfIssue1,
      dateOfIssue1: data.PreviousDateOfIssue1,
      expiredOn2: data.PreviousExpirationDate1,
      oldPassportNo2: data.PreviousPassportNumber2,
      placeOfIssue2: data.PreviousPlaceOfIssue2,
      dateOfIssue2: data.PreviousDateOfIssue2,
      expiredOn2: data.PreviousExpirationDate2,
    });
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
    } = this.state;

    const {navigation, route} = this.props;
    const {recid} = route.params;

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

  delete = async () => {
    const {navigation, route} = this.props;
    const {recid} = route.params;
    await deleteRecords(
      'Passport',
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
      'Passport',
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
            this.state.countryofIssue.length === 0
              ? 'Country of Issue'
              : this.state.countryofIssue
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: this.props.country.country,
              key: 'countryofIssue',
            })
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Country of Issue"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Passport Number"
          onChangeText={(passportNo) => this.setState({passportNo})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.passportNo}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.passportNo}
            editable={this.state.editable}
          />
        </View>
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
            onChangeText={(expirationDate) =>
              this.setState({expirationDate: formatDate(expirationDate)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.expirationDate}
            editable={this.state.editable}
            example="DD/MM/YYYY"
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
          value={this.state.address1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.address2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.city}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.state}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.zip}
          editable={this.state.editable}
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
              array: this.props.country.country,
              key: 'country',
            })
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Country"
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
          value={this.state.oldPassportNo1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={(placeOfIssue1) => this.setState({placeOfIssue1})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.placeOfIssue1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue1) =>
              this.setState({dateOfIssue1: formatDate(dateOfIssue1)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.dateOfIssue1}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expired On"
            onChangeText={(expiredOn1) =>
              this.setState({expiredOn1: formatDate(expiredOn1)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.expiredOn1}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Old Passport Number 2"
          onChangeText={(oldPassportNo2) => this.setState({oldPassportNo2})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.oldPassportNo2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Place of Issue"
          onChangeText={(placeOfIssue2) => this.setState({placeOfIssue2})}
          keyboardType="default"
          color={Color.salmon}
          value={this.state.placeOfIssue2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Date of Issue"
            onChangeText={(dateOfIssue2) =>
              this.setState({dateOfIssue2: formatDate(dateOfIssue2)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.dateOfIssue2}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expired On"
            onChangeText={(expiredOn2) =>
              this.setState({expiredOn2: formatDate(expiredOn2)})
            }
            keyboardType="default"
            color={Color.salmon}
            value={this.state.expiredOn2}
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
      <Text style={styles.title}>Additional Information</Text>
      {this.additionalInfo()}
      <View style={styles.gap} />
      <Text style={styles.title}>Previous Passports</Text>
      {this.previousPassports()}
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

background = () => require('../../../assets/jpg-images/Government-Record-Background/government-records-background.jpg')

  render() {
    const {isLoader, modal, array, key, editable} = this.state;
    const {route, navigation} = this.props;
    const {title, type, mode} = route.params;
    return (
      <Root>
        <SafeAreaView style={styles.outerView}>
          <ImageBackground source={this.background()} style={styles.backgroundImage}>
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

export default connect(mapStateToProps)(Passport);
