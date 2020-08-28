import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import Dots from 'react-native-dots-pagination';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import ModalScreen from '../../../components/modal/modal.component';
import Loader from '../../../components/loader/loader.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {boolean_value} from './life.list';

import styles from './property.style';

class PropertyInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      navigation: props.navigation,
      access_token: props.access_token,
      name: '',
      policyNo: '',
      policyHolder: '',
      issuer: '',
      installmentAmnt: '',
      url: '',
      username: '',
      password: '',
      county: '',
      parcelNo: '',
      effectiveFrom: '',
      dwellingCoverage: '',
      liabilityCoverage: '',
      medicalPayment: '',
      dwellingCoverageDeductoble: '',
      lossOfCoverage: '',
      ordianceCoverage: '',
      personalItemInsured: '',
      jointPolicyHolderTwo: '',
      jointPolicyHolderThree: '',
      escrowAccount: '',
      replacementContentCoverage: '',
      lossAssessmentCoverage: '',
      sewerBackupCoverage: '',
    };
  }

  handleClick = () => {
    const {active} = this.state;
    if (active < 3) this.setState({active: active + 1});
    else if (active === 3) this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      policyNo,
      policyHolder,
      issuer,
      installmentAmnt,
      url,
      username,
      password,
      county,
      parcelNo,
      effectiveFrom,
      dwellingCoverage,
      liabilityCoverage,
      medicalPayment,
      dwellingCoverageDeductoble,
      lossOfCoverage,
      ordianceCoverage,
      personalItemInsured,
      jointPolicyHolderTwo,
      jointPolicyHolderThree,
      escrowAccount,
      replacementContentCoverage,
      lossAssessmentCoverage,
      sewerBackupCoverage,
    } = this.state;

    let data = qs.stringify({
      Name: name,
      PolicyNumber: policyNo,
      PrimaryPolicyHolder: policyHolder,
      Issuer: issuer,
      InstallmentAccount: installmentAmnt,
      URL: url,
      WebSiteUserName: username,
      WebSitePassword: password,
      County: county,
      PropertyParcelNumber: parcelNo,
      StartDate: effectiveFrom,
      DwellingCoverage: dwellingCoverage,
      LiabilityCoverage: liabilityCoverage,
      MedicalPaymentCoverage: medicalPayment,
      DwellingCoverageDeductible: dwellingCoverageDeductoble,
      LossOfUseCoverage: lossOfCoverage,
      OrdianceAndLawCoverage: ordianceCoverage,
      PersonalItemsInsured: personalItemInsured,
      AdditionalPolicyHolder1: jointPolicyHolderTwo,
      AdditionalPolicyHolder2: jointPolicyHolderThree,
      EscrowAccount: escrowAccount === 'Yes' ? true : false,
      ReplacementOfContentsCoverage:
        replacementContentCoverage === 'Yes' ? true : false,
      LossAssessmentCoverage: lossAssessmentCoverage === 'Yes' ? true : false,
      SewerWaterBackupCoverage: sewerBackupCoverage === 'Yes' ? true : false,
    });

    await createOrUpdateRecord(
      'PropertyInsurance',
      `__NEW__`,
      data,
      access_token,
    )
      .then((response) => {
        this.setState({isLoader: false, active: 0});
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
        return this.insuranceDetails();
        break;
      case 3:
        return this.additionalInfo();
        break;
    }
  };

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
        <InputTextDynamic
          placeholder="Policy Number"
          onChangeText={(policyNo) => this.setState({policyNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Policy Holder"
          onChangeText={(policyHolder) => this.setState({policyHolder})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Issuer"
          onChangeText={(issuer) => this.setState({issuer})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Installment Amount"
            onChangeText={(installmentAmnt) => this.setState({installmentAmnt})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={
              this.state.escrowAccount.length === 0
                ? 'Escrow Account'
                : this.state.escrowAccount
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: boolean_value,
                key: 'escrowAccount',
              })
            }
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
        />
      </View>
    </View>
  );

  propertyDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="County"
          onChangeText={(county) => this.setState({county})}
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Parcel Number"
          onChangeText={(parcelNo) => this.setState({parcelNo})}
          keyboardType="default"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Effective From"
            onChangeText={(effectiveFrom) => this.setState({effectiveFrom})}
            keyboardType="default"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker label="Owned Property" onPress={() => alert('Type')} />
        </View>
      </View>
    </View>
  );

  insuranceDetails = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Dwelling Coverage (A)"
          onChangeText={(dwellingCoverage) => this.setState({dwellingCoverage})}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Liability Coverage (B)"
          onChangeText={(liabilityCoverage) =>
            this.setState({liabilityCoverage})
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Medical Payment Coverage (C)"
          onChangeText={(medicalPayment) => this.setState({medicalPayment})}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Dwelling Coverage Deductible"
          onChangeText={(dwellingCoverageDeductoble) =>
            this.setState({dwellingCoverageDeductoble})
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Loss of Use Coverage (F)"
          onChangeText={(lossOfCoverage) => this.setState({lossOfCoverage})}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label={
              this.state.replacementContentCoverage.length === 0
                ? 'Replacement of Contents Coverage'
                : this.state.replacementContentCoverage
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: boolean_value,
                key: 'replacementContentCoverage',
              })
            }
            onPress={() => alert('Type')}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <ModalPicker
            label={
              this.state.lossAssessmentCoverage.length === 0
                ? 'Loss Assessment Coverage'
                : this.state.lossAssessmentCoverage
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: boolean_value,
                key: 'lossAssessmentCoverage',
              })
            }
          />
        </View>
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <ModalPicker
            label={
              this.state.sewerBackupCoverage.length === 0
                ? 'Sewer Backup Coverage'
                : this.state.sewerBackupCoverage
            }
            onPress={() =>
              this.setState({
                modal: true,
                array: boolean_value,
                key: 'sewerBackupCoverage',
              })
            }
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextIconDynamic
            placeholder="Ordiance/Legal Coverage"
            onChangeText={(ordianceCoverage) =>
              this.setState({ordianceCoverage})
            }
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Personal Items Insured"
          onChangeText={(personalItemInsured) =>
            this.setState({personalItemInsured})
          }
        />
      </View>
    </View>
  );

  additionalInfo = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Policy Holder 2"
          onChangeText={(jointPolicyHolderTwo) =>
            this.setState({jointPolicyHolderTwo})
          }
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Policy Holder 3"
          onChangeText={(jointPolicyHolderThree) =>
            this.setState({jointPolicyHolderThree})
          }
          keyboardType="default"
        />
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
        return 'Insurance Details';
        break;
      case 3:
        return 'Additional Information';
        break;
    }
  };

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  render() {
    const {active, isLoader, modal, array, key} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.title(active)}</Text>
        {this.subComponet()}
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Proceed to next" />
        </View>
        <View style={styles.inputContainer}>
          <Dots
            length={4}
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

export default PropertyInsurance;
