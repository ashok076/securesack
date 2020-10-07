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
import TitleView from '../../../components/title-view/title-view.component';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import RefBusinessModal from '../../../components/ref-business-modal/ref-business-modal.component';
import AutoCompleteText from '../../../components/auto-complete-text-input/auto-complete-text-input.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
  lookupType,
} from '../../../configuration/api/api.functions';
import {payment_due_type} from './auto.list';
import {formatDate} from '../../../configuration/card-formatter/card-formatter';
import {Color} from '../../../assets/color/color.js';
import CopyClipboard from '../../../components/copy-clipboard/copy-clipboard.component';
import ExternalLink from '../../../components/external-link/external-link.component';

import styles from './auto.style';

class AutoInsurance extends Component {
  initialState = {
    isLoader: false,
    editable: true,
    refBusModal: false,
    access_token: '',
    modal: '',
    array: [],
    key: '',
    name: '',
    primaryPolicyHolder: '',
    policyNumber: '',
    issuer: '',
    premium: '',
    installment: '',
    from: '',
    to: '',
    total: '',
    paymentDueType: '',
    url: '',
    username: '',
    password: '',
    effectiveFrom: '',
    endsOn: '',
    additionalPolicyHolder1: '',
    additionalPolicyHolder2: '',
    additionalPolicyHolder3: '',
    additionalPolicyHolder4: '',
    securityQ1: '',
    securityA1: '',
    securityQ2: '',
    securityA2: '',
    securityQ3: '',
    securityA3: '',
    issuerId: '',
    notes: '',
    refArray: [],
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
          this.getBusinessEntity(),
        );
    });
  }

  viewRecord = async () => {
    const {recid, mode} = this.props.route.params;
    this.setState({isLoader: true});
    await viewRecords(
      'AutoInsurance',
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
        name: data.Name,
        primaryPolicyHolder: data.PrimaryPolicyHolder,
        policyNumber: data.PolicyNumber,
        issuer: data.Issuer.label,
        issuerId: data.Issuer.id,
        premium: data.PolicyPremium,
        installment: data.PaymentSchedule.InstallmentAmount,
        from: data.PaymentSchedule.InstallmentStartDate,
        to: data.PaymentSchedule.InstallmentEndDate,
        total: data.PaymentSchedule.TotalAmount,
        paymentDueType: data.PaymentSchedule.PaymentDueType,
        url: data.URL,
        username: data.WebSiteAccountNumber,
        password: data.WebSitePassword,
        effectiveFrom: data.StartDate,
        endsOn: data.EndDate,
        additionalPolicyHolder1: data.AdditionalPolicyHolder1,
        additionalPolicyHolder2: data.AdditionalPolicyHolder2,
        additionalPolicyHolder3: data.AdditionalPolicyHolder3,
        securityQ1: data.SecurityQuestion1,
        securityA1: data.SecurityAnswer1,
        securityQ2: data.SecurityQuestion2,
        securityA2: data.SecurityAnswer2,
        securityQ3: data.SecurityQuestion3,
        securityA3: data.SecurityAnswer3,
        notes: data.Comment,
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
      primaryPolicyHolder,
      policyNumber,
      issuer,
      premium,
      installment,
      from,
      to,
      total,
      paymentDueType,
      url,
      username,
      password,
      effectiveFrom,
      endsOn,
      additionalPolicyHolder1,
      additionalPolicyHolder2,
      additionalPolicyHolder3,
      additionalPolicyHolder4,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      issuerId,
      notes,
    } = this.state;

    const {navigation, route} = this.props;
    const {recid} = route.params;

    let data = qs.stringify({
      Name: name,
      PrimaryPolicyHolder: primaryPolicyHolder,
      PolicyNumber: policyNumber,
      Issuer: issuerId,
      PolicyPremium: premium,
      'PaymentSchedule-InstallmentAmount': installment,
      'PaymentSchedule-InstallmentStartDate': from,
      'PaymentSchedule-InstallmentEndDate': to,
      'PaymentSchedule-TotalAmount': total,
      'PaymentSchedule-PaymentDueType': paymentDueType,
      URL: url,
      WebSiteAccountNumber: username,
      WebSitePassword: password,
      StartDate: effectiveFrom,
      EndDate: endsOn,
      AdditionalPolicyHolder1: additionalPolicyHolder1,
      AdditionalPolicyHolder2: additionalPolicyHolder2,
      AdditionalPolicyHolder3: additionalPolicyHolder3,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      Comment: notes,
    });

    await createOrUpdateRecord('AutoInsurance', recid, data, access_token)
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
      'AutoInsurance',
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
      'AutoInsurance',
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
          color={Color.veryLightPink}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Primary Policy Holder"
          onChangeText={(primaryPolicyHolder) =>
            this.setState({primaryPolicyHolder})
          }
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.primaryPolicyHolder}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Number"
          onChangeText={(policyNumber) => this.setState({policyNumber})}
          keyboardType="number-pad"
          color={Color.veryLightPink}
          value={this.state.policyNumber}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.policyNumber}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <AutoCompleteText
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
          value={this.state.issuer}
          color={Color.veryLightBlue}
          editable={this.state.editable}
          array={this.state.refArray}
          onPress={(issuer) => this.showAutoComplete(issuer)}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Premium"
          icon="dollar-sign"
          onChangeText={(premium) => this.setState({premium})}
          color={Color.veryLightPink}
          value={this.state.premium}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          icon="dollar-sign"
          keyboardType="number-pad"
          onChangeText={(installment) => this.setState({installment})}
          color={Color.veryLightPink}
          value={this.state.installment}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
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
            })
          }
          color={Color.veryLightPink}
          editable={this.state.editable}
          name="Due"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="From"
          icon="dollar-sign"
          keyboardType="number-pad"
          onChangeText={(from) => this.setState({from: formatDate(from)})}
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
          keyboardType="number-pad"
          onChangeText={(to) => this.setState({to: formatDate(to)})}
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
          keyboardType="number-pad"
          onChangeText={(total) => this.setState({total})}
          color={Color.veryLightPink}
          value={this.state.total}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.veryLightBlue}
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
          color={Color.veryLightBlue}
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
          color={Color.veryLightBlue}
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
    <View style={styles.miniContainer}>
      <View style={[styles.miniInputContainer, {marginRight: 10}]}>
        <InputTextDynamic
          placeholder="Effective From"
          onChangeText={(effectiveFrom) =>
            this.setState({effectiveFrom: formatDate(effectiveFrom)})
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
          placeholder="Ends On"
          onChangeText={(endsOn) => this.setState({endsOn: formatDate(endsOn)})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.endsOn}
          editable={this.state.editable}
          example="DD/MM/YYYY"
        />
      </View>
    </View>
  );

  additionalPolicyHolders = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 1"
          onChangeText={(additionalPolicyHolder1) =>
            this.setState({additionalPolicyHolder1})
          }
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.additionalPolicyHolder1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 2"
          onChangeText={(additionalPolicyHolder2) =>
            this.setState({additionalPolicyHolder2})
          }
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.additionalPolicyHolder2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 3"
          onChangeText={(additionalPolicyHolder3) =>
            this.setState({additionalPolicyHolder3})
          }
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.additionalPolicyHolder3}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Additional Policy Holder 4"
          onChangeText={(additionalPolicyHolder4) =>
            this.setState({additionalPolicyHolder4})
          }
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.additionalPolicyHolder4}
          editable={this.state.editable}
        />
      </View>
    </View>
  );

  securityQuestions = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 1"
          onChangeText={(securityQ1) => this.setState({securityQ1})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.securityQ1}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.securityQ1}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.securityA1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.securityQ2}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.securityQ2}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.securityA2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.securityQ3}
          editable={this.state.editable}
        />
        <View style={styles.clipboard}>
          <CopyClipboard
            text={this.state.securityQ3}
            editable={this.state.editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
          keyboardType="default"
          color={Color.veryLightPink}
          value={this.state.securityA3}
          editable={this.state.editable}
        />
      </View>
    </View>
  );

  notes = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Notes"
          onChangeText={(notes) => this.setState({notes})}
          keyboardType="default"
          value={this.state.notes}
          color={Color.veryLightPink}
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

  changeRefBusinessmModal = (bool) => {
    this.setState({refBusModal: bool});
  };

  refreshingList = () => {
    this.getBusinessEntity();
  };

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

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
      <Text style={styles.title}>Additional Policy Holder</Text>
      {this.additionalPolicyHolders()}
      <View style={styles.gap} />
      <Text style={styles.title}>Security Questions</Text>
      {this.securityQuestions()}
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

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(AutoInsurance);
