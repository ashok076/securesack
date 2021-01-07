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
import TitleView from '../../../components/title-view/title-view.component';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import RefBusinessModal from '../../../components/ref-business-modal/ref-business-modal.component';
import ModalScreen from '../../../components/modal/modal.component';
import AutoCompleteText from '../../../components/auto-complete-text-input/auto-complete-text-input.component';
import MultilineInput from '../../../components/multiline-input-text/multiline-input-text.component';
import SwitchKey from '../../../components/switch-key/switch-key.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
  lookupType,
} from '../../../configuration/api/api.functions';
import {payment_due_type} from './life.list';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import {Color} from '../../../assets/color/color';
import CopyClipboard from '../../../components/copy-clipboard/copy-clipboard.component';
import ExternalLink from '../../../components/external-link/external-link.component';

import styles from './life.style';

class LifeInsurance extends Component {
  initialState = {
    isLoader: false,
    editable: true,
    refBusModal: false,
    access_token: '',
    modal: '',
    array: [],
    refArray: [],
    key: '',
    name: '',
    policyNo: '',
    policyHolder: '',
    issuer: '',
    premiumAmnt: '',
    insuredAmnt: '',
    url: '',
    username: '',
    password: '',
    customerServiceNo: '',
    emailProvided: '',
    effectiveFrom: '',
    endsOn: '',
    installment: '',
    from: '',
    to: '',
    total: '',
    paymentDueType: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    beneficiaries1: '',
    beneficiaries2: '',
    beneficiaries3: '',
    beneficiaries4: '',
    issuerId: '',
    notes: '',
    changes: false,
    shareKeyId: ''
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
          this.getBusinessEntity(),
        );
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
}

  viewRecord = async () => {
    const { navigation, route } = this.props
    const {recid, mode} = route.params;
    this.setState({isLoader: true});
    await viewRecords(
      'LifeInsurance',
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
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      });
    this.setState({isLoader: false});
    if (mode === 'Add') this.setState({editable: false, hideResult: false});
  };

  refreshData = () => {
    this.viewRecord()
  }

  setViewData = (data) => {
    console.log('Data: ', data);
    this.setState(
      {
        name: data.Name,
        policyNo: data.PolicyNumber,
        policyHolder: data.PolicyHolder,
        issuer: data.Issuer.label,
        issuerId: data.Issuer.id,
        premiumAmnt: data.PremiumAmount,
        insuredAmnt: data.InsuranceAmount,
        url: data.URL,
        username: data.WebSiteUserName,
        password: data.WebSitePassword,
        customerServiceNo: data.Phone,
        emailProvided: data.EmailAddress,
        effectiveFrom: data.StartDate,
        endsOn: data.EndDate,
        installment: data.PaymentSchedule.InstallmentAmount,
        from: data.PaymentSchedule.InstallmentStartDate,
        to: data.PaymentSchedule.InstallmentEndDate,
        total: data.PaymentSchedule.TotalAmount,
        paymentDueType: data.PaymentSchedule.PaymentDueType,
        address1: data.ClaimsMailingAddress.Line1,
        address2: data.ClaimsMailingAddress.Line2,
        city: data.ClaimsMailingAddress.City,
        state: data.ClaimsMailingAddress.State,
        zip: data.ClaimsMailingAddress.Zip,
        country: data.ClaimsMailingAddress.Country,
        beneficiaries1: data.Beneficiary1,
        beneficiaries2: data.Beneficiary2,
        beneficiaries3: data.Beneficiary3,
        beneficiaries4: data.Beneficiary4,
        notes: data.Note,
        shareKeyId: data.shareKeyId,
        isLoader: false,
      },
      () => this.referenceObj(),
    );
  };

  referenceObj = () => {
    const {refArray} = this.state;
    refArray
      .filter((item) => item.id === this.state.issuingBankId)
      .map((val) => this.setState({issuer: val.label}));
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

  submit = async () => {
    this.setState({isLoader: true});
    const {
      access_token,
      name,
      policyNo,
      policyHolder,
      issuer,
      premiumAmnt,
      insuredAmnt,
      url,
      username,
      password,
      customerServiceNo,
      emailProvided,
      effectiveFrom,
      endsOn,
      installment,
      from,
      to,
      total,
      paymentDueType,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      beneficiaries1,
      beneficiaries2,
      beneficiaries3,
      beneficiaries4,
      issuerId,
      notes
    } = this.state;

    const {navigation, route} = this.props;
    const {recid} = route.params;

    let data = qs.stringify({
      Name: name,
      PolicyNumber: policyNo,
      PolicyHolder: policyHolder,
      Issuer: issuerId,
      PremiumAmount: premiumAmnt,
      InsuranceAmount: insuredAmnt,
      URL: url,
      WebSiteUserName: username,
      WebSitePassword: password,
      Phone: customerServiceNo,
      EmailAddress: emailProvided,
      StartDate: effectiveFrom,
      EndDate: endsOn,
      'PaymentSchedule-InstallmentAmount': installment,
      'PaymentSchedule-InstallmentStartDate': from,
      'PaymentSchedule-InstallmentEndDate': to,
      'PaymentSchedule-TotalAmount': total,
      'PaymentSchedule-PaymentDueType': paymentDueType,
      'ClaimsMailingAddress-Line1': address1,
      'ClaimsMailingAddress-Line2': address2,
      'ClaimsMailingAddress-City': city,
      'ClaimsMailingAddress-State': state,
      'ClaimsMailingAddress-Zip': zip,
      'ClaimsMailingAddress-Country': country,
      Beneficiary1: beneficiaries1,
      Beneficiary2: beneficiaries2,
      Beneficiary3: beneficiaries3,
      Beneficiary4: beneficiaries4,
      Note: notes
    });

    await createOrUpdateRecord('LifeInsurance', recid, data, access_token)
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
      'LifeInsurance',
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
      'LifeInsurance',
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
          onChangeText={(name) => this.setState({name}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Number"
          onChangeText={(policyNo) => this.setState({policyNo}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.policyNo}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.policyNo}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Holder"
          onChangeText={(policyHolder) => this.setState({policyHolder}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.policyHolder}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <AutoCompleteText
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer}, () => this.changesMade())}
          keyboardType="default"
          value={this.state.issuer}
          color={Color.veryLightBlue}
          editable={this.state.editable}
          array={this.state.refArray}
          onPress={(issuer) => this.showAutoComplete(issuer)}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Premium Amount"
            onChangeText={(premiumAmnt) => this.setState({premiumAmnt}, () => this.changesMade())}
            keyboardType="default"
            color={Color.veryLightPink}
            value={this.state.premiumAmnt}
            editable={this.state.editable}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Insured Amount"
            onChangeText={(insuredAmnt) => this.setState({insuredAmnt}, () => this.changesMade())}
            keyboardType="default"
            color={Color.veryLightPink}
            value={this.state.insuredAmnt}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.url}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <ExternalLink link={this.state.url} editable={this.state.editable} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
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
          onChangeText={(password) => this.setState({password}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
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

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Customer Service Number"
          onChangeText={(customerServiceNo) =>
            this.setState({customerServiceNo}, () => this.changesMade())
          }
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.customerServiceNo}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Email Provided"
          onChangeText={(emailProvided) => this.setState({emailProvided}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.emailProvided}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={(effectiveFrom) =>
              this.setState({effectiveFrom: formatDate(effectiveFrom)}, () => this.changesMade())
            }
            keyboardType="default"
            color={Color.veryLightPink}
            value={this.state.effectiveFrom}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expiration"
            onChangeText={(endsOn) =>
              this.setState({endsOn: formatDate(endsOn)}, () => this.changesMade())
            }
            keyboardType="default"
            color={Color.veryLightPink}
            value={this.state.endsOn}
            editable={this.state.editable}
            example="DD/MM/YYYY"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          icon="dollar-sign"
          onChangeText={(installment) => this.setState({installment}, () => this.changesMade())}
          color={Color.veryLightPink}
          value={this.state.installment}
          editable={this.state.editable}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <ModalPicker
          label={
            this.state.paymentDueType.length === 0
              ? 'Due'
              : this.state.paymentDueType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: payment_due_type,
              key: 'paymentDueType',
            }, () => this.changesMade())
          }
          color={Color.veryLightBlue}
          editable={this.state.editable}
          name="Due"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="From"
          icon="dollar-sign"
          onChangeText={(from) => this.setState({from: formatDate(from)}, () => this.changesMade())}
          color={Color.veryLightPink}
          value={this.state.from}
          editable={this.state.editable}
          example="DD/MM/YYYY"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="To"
          icon="dollar-sign"
          onChangeText={(to) => this.setState({to: formatDate(to)}, () => this.changesMade())}
          color={Color.veryLightPink}
          value={this.state.to}
          editable={this.state.editable}
          example="DD/MM/YYYY"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Total"
          icon="dollar-sign"
          onChangeText={(total) => this.setState({total}, () => this.changesMade())}
          color={Color.veryLightPink}
          value={this.state.total}
          editable={this.state.editable}
        />
      </View>
    </View>
  );

  claimMailingAddress = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={(address1) => this.setState({address1}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.address1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.address2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.city}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.state}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
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
            }, () => this.changesMade())
          }
          color={Color.veryLightBlue}
          editable={this.state.editable}
          name="Country"
        />
      </View>
    </View>
  );

  beneficiaries = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 1"
          onChangeText={(beneficiaries1) => this.setState({beneficiaries1}, () => this.changesMade())}
          icon="dollar-sign"
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.beneficiaries1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 2"
          onChangeText={(beneficiaries2) => this.setState({beneficiaries2}, () => this.changesMade())}
          icon="dollar-sign"
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.beneficiaries2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 3"
          onChangeText={(beneficiaries3) => this.setState({beneficiaries3}, () => this.changesMade())}
          icon="dollar-sign"
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.beneficiaries3}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Beneficiary 4"
          onChangeText={(beneficiaries4) => this.setState({beneficiaries4}, () => this.changesMade())}
          icon="dollar-sign"
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.beneficiaries4}
          editable={this.state.editable}
        />
      </View>
    </View>
  );

  notes = () => (
    <View>
      <View style={styles.inputContainer}>
        <MultilineInput
          placeholder="Notes"
          onChangeText={(notes) => this.setState({notes}, () => this.changesMade())}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.notes}
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

  changeRefBusinessmModal = (bool) => {
    this.setState({refBusModal: bool});
  };

  refreshingList = () => {
    this.getBusinessEntity();
  };

  showAutoComplete = (issuer) => {
    if (issuer.label === 'Add') this.setState({refBusModal: true});
    else {
      this.setState(
        {
          issuer: issuer.label,
          issuerId: issuer.id,
        },
        () => this.setState({hideResult: true}),
      );
    }
  };

changesMade = () => {
  const {mode} = this.props.route.params;
  const {editable} = this.state;
  if (!editable) this.setState({ changes: true }, () => console.log("Check: "));
}

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  editComponent = (isLoader, modal, array, key, editable) => (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>
      {this.basicInformation()}
      <View style={styles.gap} />
      <Text style={styles.title}>Additional Information</Text>
      {this.additionalInformation()}
      <View style={styles.gap} />
      <Text style={styles.title}>Claims Mailing Address</Text>
      {this.claimMailingAddress()}
      <View style={styles.gap} />
      <Text style={styles.title}>Beneficiaries</Text>
      {this.beneficiaries()}
      <View style={styles.gap} />
      <Text style={styles.title}>Notes</Text>
      {this.notes()}
      <Loader isLoader={isLoader} />
      <ModalScreen
        isModalVisible={modal}
        list={array}
        changeModalVisibility={this.changeModalVisibility}
        id={key}
        changeState={this.changeState}
      />
      <RefBusinessModal
        isModalVisible={this.state.refBusModal}
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
    require('../../../assets/jpg-images/Insurance-Background/insurance-background.jpg');

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
                theme={'dark'}
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
              <SwitchKey type={'LifeInsurance'} recid={recid} shareKeyId={shareKeyId} refresh={this.refreshData}/>
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

export default connect(mapStateToProps)(LifeInsurance);
