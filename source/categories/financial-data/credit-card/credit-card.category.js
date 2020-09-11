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

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import TitleView from '../../../components/title-view/title-view.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
} from '../../../configuration/api/api.functions';
import {credit_card_type} from './credit-card.list';
import {Color} from '../../../assets/color/color.js';

import styles from './credit-card.style';

class CreditCard extends Component {
  initialState = {
    isLoader: false,
    modal: false,
    array: [],
    key: '',
    name: '',
    cardHolderName: '',
    cardNo: '',
    expiryDate: '',
    cvv: '',
    url: '',
    username: '',
    password: '',
    cardHolderName2: '',
    cardNo2: '',
    expiryDate2: '',
    cvv2: '',
    securityQ1: '',
    securityA1: '',
    securityQ2: '',
    securityA2: '',
    securityQ3: '',
    securityA3: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    creditCardType: '',
    access_token: '',
    editable: true,
    
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
        );
    });
  }

  viewRecord = async () => {
    const {recid, mode} = this.props.route.params;
    this.setState({isLoader: true});
    await viewRecords(
      'CreditCard',
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
    if (mode === 'Add') this.setState({editable: false});
  };

  setViewData = (data) => {
    console.log('Data: ', data);
    this.setState({
      name: data.Name,
      cardHolderName: data.PrimaryCardHolder,
      cardNo: data.CardNumber,
      expiryDate: data.ExpirationDate,
      cvv: data.CreditCardVerificationValue,
      url: data.URL,
      username: data.WebSiteAccountNumber,
      password: data.WebSitePassword,
      cardHolderName2: data.AdditionalCardHolder,
      cardNo2: data.AdditionalCardNumber,
      expiryDate2: data.AdditionalCardExpirationDate,
      cvv2: data.AdditionalCreditCardVerificationValue,
      securityQ1: data.SecurityQuestion1,
      securityA1: data.SecurityAnswer1,
      securityQ2: data.SecurityQuestion2,
      securityA2: data.SecurityAnswer2,
      securityQ3: data.SecurityQuestion3,
      securityA3: data.SecurityAnswer3,
      address1: data.PaymentMailingAddress.Line1,
      address2: data.PaymentMailingAddress.Line2,
      city: data.PaymentMailingAddress.City,
      state: data.PaymentMailingAddress.State,
      zip: data.PaymentMailingAddress.Zip,
      country: data.PaymentMailingAddress.Country,
      creditCardType: data.CreditCardType,
      isLoader: false,
    });
  };

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      name,
      cardHolderName,
      cardNo,
      expiryDate,
      cvv,
      url,
      username,
      password,
      cardHolderName2,
      cardNo2,
      expiryDate2,
      cvv2,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      address1,
      address2,
      city,
      state,
      zip,
      country,
      access_token,
      creditCardType,
    } = this.state;
    const {navigation, route} = this.props;
    const {recid} = route.params;
    let data = qs.stringify({
      Name: name,
      PrimaryCardHolder: cardHolderName,
      CardNumber: cardNo,
      ExpirationDate: expiryDate,
      CreditCardVerificationValue: cvv,
      URL: url,
      WebSiteAccountNumber: username,
      WebSitePassword: password,
      AdditionalCardHolder: cardHolderName2,
      AdditionalCardNumber: cardNo2,
      AdditionalCardExpirationDate: expiryDate2,
      AdditionalCreditCardVerificationValue: cvv2,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      'PaymentMailingAddress-Line1': address1,
      'PaymentMailingAddress-Line2': address2,
      'PaymentMailingAddress-City': city,
      'PaymentMailingAddress-State': state,
      'PaymentMailingAddress-Zip': zip,
      'PaymentMailingAddress-Country': country,
      CreditCardType: creditCardType,
    });
    await createOrUpdateRecord('CreditCard', recid, data, access_token)
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
      'CreditCard',
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
      'CreditCard',
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

  primaryCard = (editable) => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.name}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={(cardHolderName) => this.setState({cardHolderName})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardHolderName}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.creditCardType.length === 0
              ? 'Type'
              : this.state.creditCardType
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: credit_card_type,
              key: 'creditCardType',
            })
          }
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo) => this.setState({cardNo})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardNo}
          editable={editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate) => this.setState({expiryDate})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.expiryDate}
          editable={editable}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv) => this.setState({cvv})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.cvv}
          editable={editable}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.url}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="User Name"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.username}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.password}
          editable={editable}
        />
      </View>
    </View>
  );

  additionalCardInfo = (editable) => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={(cardHolderName2) => this.setState({cardHolderName2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardHolderName2}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo2) => this.setState({cardNo2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.cardNo2}
          editable={editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate2) => this.setState({expiryDate2})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.expiryDate2}
          editable={editable}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv2) => this.setState({cvv2})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.cvv2}
          editable={editable}
          />
        </View>
      </View>
    </View>
  );

  securityQuestions = (editable) => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 1"
          onChangeText={(securityQ1) => this.setState({securityQ1})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ1}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA1}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ2}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA2}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ3}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA3}
          editable={editable}
        />
      </View>
    </View>
  );

  paymentMailingAddress = (editable) => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 1"
          onChangeText={(address1) => this.setState({address1})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.address1}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) => this.setState({address2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.address2}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="City"
          onChangeText={(city) => this.setState({city})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.city}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) => this.setState({state})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.state}
          editable={editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Zip/Postal"
          onChangeText={(zip) => this.setState({zip})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.zip}
          editable={editable}
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
          editable={editable}
        />
      </View>
    </View>
  );

  // additionalInformation = () => (
  //   <View>
  //     <View style={styles.inputContainer}>
  //       <InputTextIconDynamic
  //         placeholder="Credit Limit"
  //         onChangeText={this.handleFirstNaame}
  //         icon="dollar-sign"
  //         keyboardType="default"
  //         color={Color.lightishBlue}
  //         value={this.state.address1}
  //       />
  //     </View>
  //     <View style={styles.inputContainer}>
  //       <InputTextDynamic
  //         placeholder="APR"
  //         onChangeText={this.handleFirstNaame}
  //         keyboardType="default"
  //         color={Color.lightishBlue}
  //         value={this.state.address1}
  //       />
  //     </View>
  //     <View style={styles.inputContainer}>
  //       <InputTextIconDynamic
  //         placeholder="Monthly Payment Date"
  //         onChangeText={this.handleFirstNaame}
  //         icon="percent"
  //         keyboardType="default"
  //         color={Color.lightishBlue}
  //         value={this.state.address1}
  //       />
  //     </View>
  //   </View>
  // );

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  editComponent = (isLoader, modal, array, key, editable) => (
    <View>
      <Text style={styles.title}>Primary Card</Text>
      {this.primaryCard(editable)}
      <View style={styles.gap} />
      <Text style={styles.title}>Additional Card Information</Text>
      {this.additionalCardInfo(editable)}
      <View style={styles.gap} />
      <Text style={styles.title}>Security Questions</Text>
      {this.securityQuestions(editable)}
      <View style={styles.gap} />
      <Text style={styles.title}>Payment Mailing Address</Text>
      {this.paymentMailingAddress(editable)}
      <View style={styles.gap} />
      {/* <Text style={styles.title}>Additional Information</Text>
        {this.additionalInformation()} */}
      <View style={styles.gap} />
      {!editable ? (
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Submit" />
        </View>
      ) : (
        <View />
      )}
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
    const {isLoader, modal, array, key, editable} = this.state;
    const {route, navigation} = this.props;
    const {title, type, background, theme, mode} = route.params;
    return (
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
            ]}>
            <View style={styles.container}>
              {this.editComponent(isLoader, modal, array, key, editable)}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({userData, country}) => ({
  userData,
  country,
});

export default connect(mapStateToProps)(CreditCard);
