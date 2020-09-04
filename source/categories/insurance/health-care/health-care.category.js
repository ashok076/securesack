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
import {insurance_type, plan_type, payment_due_type} from './health-care.list';
import {Color} from '../../../assets/color/color.js';

import styles from './health-care.style';

class HealthCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      countries: props.countries.country,
      recid: props.recid,
      modal: '',
      array: [],
      key: '',
      insuranceProvider: '',
      insuranceType: '',
      planType: '',
      groupIdNumber: '',
      planCoverage: '',
      deductible: '',
      url: '',
      username: '',
      password: '',
      customerServiceNo: '',
      emailProvided: '',
      effectiveFrom: '',
      expiration: '',
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
      dependent1: '',
      dependent2: '',
      dependent3: '',
      dependent4: '',
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
      insuranceProvider,
      insuranceType,
      planType,
      groupIdNumber,
      planCoverage,
      deductible,
      url,
      username,
      password,
      customerServiceNo,
      emailProvided,
      effectiveFrom,
      expiration,
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
      dependent1,
      dependent2,
      dependent3,
      dependent4,
    } = this.state;

    let data = qs.stringify({
      ProviderName: insuranceProvider,
      GroupID: groupIdNumber,
      PlanCoverage: planCoverage,
      Deductible: deductible,
      URL: url,
      ProviderType: insuranceType,
      PlanType: planType,
      WebsiteUserName: username,
      WebsitePassword: password,
      Phone: customerServiceNo,
      EmailAddress: emailProvided,
      ServiceEffectiveDate: effectiveFrom,
      ServiceTerminationDate: expiration,
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
      Dependent1: dependent1,
      Dependent2: dependent2,
      Dependent3: dependent3,
      Dependent4: dependent4,
    });

    await createOrUpdateRecord(
      'HealthCareProvider',
      recid,
      data,
      access_token,
    )
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  baiscInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Insurance Provider"
          onChangeText={(insuranceProvider) =>
            this.setState({insuranceProvider})
          }
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.insuranceType.length === 0
              ? 'Insurance Type'
              : this.state.insuranceType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: insurance_type,
              key: 'insuranceType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.planType.length === 0 ? 'Plan Type' : this.state.planType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: plan_type,
              key: 'planType',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Group ID Number"
          onChangeText={(groupIdNumber) => this.setState({groupIdNumber})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Plan Coverage"
          onChangeText={(planCoverage) => this.setState({planCoverage})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Deductible"
          onChangeText={(deductible) => this.setState({deductible})}
          icon="percent"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
    </View>
  );

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Customer Service Number"
          onChangeText={(customerServiceNo) =>
            this.setState({customerServiceNo})
          }
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Email Provided"
          onChangeText={(emailProvided) => this.setState({emailProvided})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={(effectiveFrom) => this.setState({effectiveFrom})}
            keyboardType="default"
          color={Color.veryLightPink}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Expiration"
            onChangeText={(expiration) => this.setState({expiration})}
            keyboardType="default"
          color={Color.veryLightPink}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Installment"
          icon="dollar-sign"
          onChangeText={(installment) => this.setState({installment})}
        />
      </View>
      <View style={[styles.inputContainer, {marginRight: 10}]}>
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
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="From"
          icon="dollar-sign"
          onChangeText={(from) => this.setState({from})}
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="To"
          icon="dollar-sign"
          onChangeText={(to) => this.setState({to})}
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Total"
          icon="dollar-sign"
          onChangeText={(total) => this.setState({total})}
          color={Color.veryLightPink}
        />
      </View>
    </View>
  );

  claimMailingAddress = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={(address1) => this.setState({address1})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
          color={Color.veryLightPink}
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
    </View>
  );

  dependentInfo = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Dependent 1"
          onChangeText={(dependent1) => this.setState({dependent1})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Dependent 2"
          onChangeText={(dependent2) => this.setState({dependent2})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Dependent 3"
          onChangeText={(dependent3) => this.setState({dependent3})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Dependent 4"
          onChangeText={(dependent4) => this.setState({dependent4})}
          keyboardType="default"
          color={Color.veryLightPink}
        />
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
        {this.baiscInformation()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Claims Mailing Address</Text>
        {this.claimMailingAddress()}
        <View style={styles.gap}/>
        <Text style={styles.title}>Dependent Information</Text>
        {this.dependentInfo()}
        <View style={styles.gap}/>
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

export default HealthCare;
