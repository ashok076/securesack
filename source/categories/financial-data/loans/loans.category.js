import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Modal,
  SafeAreaView,
  ImageBackground,
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
import RefBusinessModal from '../../../components/ref-business-modal/ref-business-modal.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import TitleView from '../../../components/title-view/title-view.component';
import AutoCompleteText from '../../../components/auto-complete-text-input/auto-complete-text-input.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
  lookupType,
} from '../../../configuration/api/api.functions';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import {refianced} from './loans.list';
import {Color} from '../../../assets/color/color';
import CopyClipboard from '../../../components/copy-clipboard/copy-clipboard.component';
import ExternalLink from '../../../components/external-link/external-link.component';

import styles from './loans.style';

class ConsumerLoan extends Component {
  initialState = {
    isLoader: false,
    modal: false,
    refBusModal: false,
    array: [],
    key: '',
    name: '',
    loanNo: '',
    issuer: '',
    issuerId: '',
    loanAmnt: '',
    interestRate: '',
    url: '',
    username: '',
    password: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    effectiveFrom: '',
    endsOn: '',
    refiance: '',
    access_token: '',
    editable: true,
    hideResult: true,
    refArray: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.setState(this.initialState);
      if (this.props.userData && this.props.userData.userData)
        this.setState(
          {access_token: this.props.userData.userData.access_token},
          () => this.viewRecord(),
          this.getBusinessEntity(),
        );
    });
  }

  viewRecord = async () => {
    const {recid, mode} = this.props.route.params;
    this.setState({isLoader: true});
    await viewRecords(
      'ConsumerLoan',
      recid,
      this.props.userData.userData.access_token,
    )
      .then((response) => {
        console.log('View res: ', response);
        this.setViewData(response.data);
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
      });
    if (mode === 'Add') this.setState({editable: false, hideResult: false});
  };

  setViewData = (data) => {
    this.setState(
      {
        name: data.Name,
        loanNo: data.LoanNumber,
        issuer: data.Issuer.label,
        issuerId: data.Issuer.id,
        loanAmnt: data.LoanAmount,
        interestRate: data.InterestRate,
        url: data.URL,
        username: data.WebSiteUsername,
        password: data.WebSitePassword,
        address1: data.PaymentMailingAddress.Line1,
        address2: data.PaymentMailingAddress.Line2,
        city: data.PaymentMailingAddress.City,
        state: data.PaymentMailingAddress.State,
        zip: data.PaymentMailingAddress.Zip,
        country: data.PaymentMailingAddress.Country,
        effectiveFrom: data.StartDate,
        endsOn: data.EndDate,
        refiance: data.Refinanced,
        isLoader: false,
      },
      () => this.referenceObj(),
    );
  };

  referenceObj = () => {
    const {refArray} = this.state;
    refArray
      .filter((item) => item.id === this.state.issuerId)
      .map((val) => this.setState({issuer: val.label}));
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      loanNo,
      issuerId,
      loanAmnt,
      interestRate,
      url,
      username,
      password,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      effectiveFrom,
      endsOn,
      refiance,
      access_token,
    } = this.state;
    const {navigation, route} = this.props;
    const {recid} = route.params;
    let data = qs.stringify({
      Name: name,
      LoanNumber: loanNo,
      Issuer: issuerId,
      LoanAmount: loanAmnt,
      InterestRate: interestRate,
      URL: url,
      WebSiteUsername: username,
      WebSitePassword: password,
      'PaymentMailingAddress-Line1': address1,
      'PaymentMailingAddress-Line2': address2,
      'PaymentMailingAddress-City': city,
      'PaymentMailingAddress-State': state,
      'PaymentMailingAddress-Zip': zip,
      'PaymentMailingAddress-Country': country,
      StartDate: effectiveFrom,
      EndDate: endsOn,
      Refinanced: refiance === 'Yes' ? true : false,
    });
    await createOrUpdateRecord('ConsumerLoan', recid, data, access_token)
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
      'ConsumerLoan',
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
      'ConsumerLoan',
      recid,
      data,
      this.props.userData.userData.access_token,
    )
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
          color={Color.lightishBlue}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Loan Number"
          onChangeText={(loanNo) => this.setState({loanNo})}
          keyboardType="number-pad"
          color={Color.lightishBlue}
          value={this.state.loanNo}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.loanNo}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <AutoCompleteText
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.issuer}
          editable={this.state.editable}
          array={this.state.refArray}
          hideResult={this.state.hideResult}
          onPress={(issuer) => this.showAutoComplete(issuer)}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Loan Amount"
          icon="dollar-sign"
          onChangeText={(loanAmnt) => this.setState({loanAmnt})}
          color={Color.lightishBlue}
          value={this.state.loanAmnt}
          editable={this.state.editable}
          keyboardType="number-pad"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Interest Rate"
          onChangeText={(interestRate) => this.setState({interestRate})}
          icon="percent"
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.interestRate}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.url}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <ExternalLink link={this.state.url} editable={this.state.editable} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.username}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.username}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.password}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.password}
            editable={this.state.editable}
          />
        </View>
      </View>
    </View>
  );

  paymentMailingAddress = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={(address1) => this.setState({address1})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.address1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.address2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.city}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.state}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
          color={Color.lightishBlue}
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
          editable={this.state.editable}
          name="Country"
        />
      </View>
    </View>
  );

  refiance = () => (
    <View>
      <View style={[styles.miniInputContainer, {marginRight: 10}]}>
        <ModalPicker
          label={
            this.state.refiance.length === 0 ? 'Refianced' : this.state.refiance
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: refianced,
              key: 'refiance',
            })
          }
          editable={this.state.editable}
          name="Refiance"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={(effectiveFrom) =>
              this.setState({effectiveFrom: formatDate(effectiveFrom)})
            }
            keyboardType="number-pad"
            color={Color.lightishBlue}
            value={this.state.effectiveFrom}
            editable={this.state.editable}
            example="MM/DD/YYYY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Ends On"
            onChangeText={(endsOn) =>
              this.setState({endsOn: formatDate(endsOn)})
            }
            keyboardType="number-pad"
            color={Color.lightishBlue}
            value={this.state.endsOn}
            editable={this.state.editable}
            example="MM/DD/YYYY"
          />
        </View>
      </View>
    </View>
  );

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  showAutoComplete = (val) => {
    if (val.label === 'Add') this.setState({refBusModal: true});
    else {
      this.setState(
        {
          issuer: val.label,
          issuerId: val.id,
        },
        () => this.setState({hideResult: true}),
      );
    }
  };

  getBusinessEntity = async () => {
    const {userData} = this.props;
    if (userData !== null) {
      await lookupType(userData.userData.access_token, 'RefBusinessEntity')
        .then((response) => {
          response.pop();
          this.setState({refArray: response});
        })
        .catch((error) => console.log('Ref Business error: ', error));
    }
  };

  changeRefBusinessmModal = (bool) => {
    this.setState({refBusModal: bool});
  };

  refreshingList = () => {
    this.getBusinessEntity();
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  editComponent = (isLoader, modal, array, key, editable, refBusModal) => (
    <View>
      <Text style={styles.title}>Basic Information</Text>
      {this.basicInformation()}
      <View style={styles.gap} />
      <Text style={styles.title}>Payment mailing address</Text>
      {this.paymentMailingAddress()}
      <View style={styles.gap} />
      <Text style={styles.title}>Refiance</Text>
      {this.refiance()}
      <View style={styles.gap} />
      <Loader isLoader={isLoader} />
      <ModalScreen
        isModalVisible={modal}
        list={array}
        changeModalVisibility={this.changeModalVisibility}
        id={key}
        changeState={this.changeState}
      />
      <RefBusinessModal
        isModalVisible={refBusModal}
        changeModalVisibility={this.changeRefBusinessmModal}
        access_token={this.props.userData.userData.access_token}
        refreshingList={this.refreshingList}
      />
    </View>
  );

  onSave = () => {
    this.submit();
  };

  onEdit = () => {
    this.setState({editable: false});
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
    const {isLoader, modal, array, key, editable, refBusModal} = this.state;
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
              style={[
                styles.outerContainerView,
                {
                  backgroundColor:
                    theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)',
                },
              ]}
              keyboardShouldPersistTaps="handled">
              <View style={styles.container}>
                {this.editComponent(
                  isLoader,
                  modal,
                  array,
                  key,
                  editable,
                  refBusModal,
                )}
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

export default connect(mapStateToProps)(ConsumerLoan);
