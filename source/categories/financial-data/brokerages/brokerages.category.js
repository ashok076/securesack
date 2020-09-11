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
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import TitleView from '../../../components/title-view/title-view.component';
import {
  createOrUpdateRecord,
  viewRecords,
  deleteRecords,
  archiveRecords,
} from '../../../configuration/api/api.functions';
import {Color} from '../../../assets/color/color.js';

import styles from './brokerages.style';

class BrokerageAccount extends Component {
  initialState = {
    isLoader: false,
    name: '',
    financialInstitution: '',
    acNumber: '',
    username: '',
    password: '',
    url: '',
    primaryAcHolder: '',
    joinAcHolderOne: '',
    joinAcHolderTwo: '',
    securityQ1: '',
    securityA1: '',
    securityQ2: '',
    securityA2: '',
    securityQ3: '',
    securityA3: '',
    stockTransactionFee: '',
    openedOn: '',
    closedOn: '',
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
      'BrokerageAccount',
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
    this.setState({
      name: data.BrokerageName,
      financialInstitution: data.FinancialInstitution,
      acNumber: data.AccountNumber,
      username: data.WebSiteAccountNumber,
      password: data.WebSitePassword,
      url: data.URL,
      primaryAcHolder: data.PrimaryAccountHolder,
      joinAcHolderOne: data.AdditionalAccountHolder1,
      joinAcHolderTwo: data.AdditionalAccountHolder2,
      securityQ1: data.SecurityQuestion1,
      securityA1: data.SecurityAnswer1,
      securityQ2: data.SecurityQuestion2,
      securityA2: data.SecurityAnswer2,
      securityQ3: data.SecurityQuestion3,
      securityA3: data.SecurityAnswer3,
      stockTransactionFee: data.StockTransactionFee,
      openedOn: data.AccountOpeningDate,
      closedOn: data.AccountClosingDate,
      isLoader: false,
    });
  };

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {
      access_token,
      name,
      financialInstitution,
      acNumber,
      username,
      password,
      url,
      primaryAcHolder,
      joinAcHolderOne,
      joinAcHolderTwo,
      securityQ1,
      securityA1,
      securityQ2,
      securityA2,
      securityQ3,
      securityA3,
      stockTransactionFee,
      openedOn,
      closedOn,
    } = this.state;
    const {navigation, route} = this.props;
    const {recid} = route.params;
    let data = qs.stringify({
      BrokerageName: name,
      FinancialInstitution: financialInstitution,
      AccountNumber: acNumber,
      WebSiteAccountNumber: username,
      WebSitePassword: password,
      URL: url,
      PrimaryAccountHolder: primaryAcHolder,
      AdditionalAccountHolder1: joinAcHolderOne,
      AdditionalAccountHolder2: joinAcHolderTwo,
      SecurityQuestion1: securityQ1,
      SecurityAnswer1: securityA1,
      SecurityQuestion2: securityQ2,
      SecurityAnswer2: securityA2,
      SecurityQuestion3: securityQ3,
      SecurityAnswer3: securityA3,
      StockTransactionFee: stockTransactionFee,
      AccountOpeningDate: openedOn,
      AccountClosingDate: closedOn,
    });
    await createOrUpdateRecord('BrokerageAccount', recid, data, access_token)
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
      'BrokerageAccount',
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
      'BrokerageAccount',
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
          placeholder="Financial Institution"
          onChangeText={(financialInstitution) =>
            this.setState({financialInstitution})
          }
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.financialInstitution}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Account Number"
          onChangeText={(acNumber) => this.setState({acNumber})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.acNumber}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.username}
          editable={this.state.editable}
        />
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
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Primary Account Holder"
          onChangeText={(primaryAcHolder) => this.setState({primaryAcHolder})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.primaryAcHolder}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Account Holder 1"
          onChangeText={(joinAcHolderOne) => this.setState({joinAcHolderOne})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.joinAcHolderOne}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Joint Account Holder 2"
          onChangeText={(joinAcHolderTwo) => this.setState({joinAcHolderTwo})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.joinAcHolderTwo}
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
          color={Color.lightishBlue}
          value={this.state.securityQ1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 1"
          onChangeText={(securityA1) => this.setState({securityA1})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA1}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 2"
          onChangeText={(securityQ2) => this.setState({securityQ2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 2"
          onChangeText={(securityA2) => this.setState({securityA2})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA2}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Security Question 3"
          onChangeText={(securityQ3) => this.setState({securityQ3})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityQ3}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Answer 3"
          onChangeText={(securityA3) => this.setState({securityA3})}
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.securityA3}
          editable={this.state.editable}
        />
      </View>
    </View>
  );

  additionalInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextIconDynamic
          placeholder="Stock Transaction Fee"
          onChangeText={(stockTransactionFee) =>
            this.setState({stockTransactionFee})
          }
          icon="dollar-sign"
          keyboardType="default"
          color={Color.lightishBlue}
          value={this.state.stockTransactionFee}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Opened On"
            onChangeText={(openedOn) => this.setState({openedOn})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.openedOn}
            editable={this.state.editable}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Closed On"
            onChangeText={(closedOn) => this.setState({closedOn})}
            keyboardType="default"
            color={Color.lightishBlue}
            value={this.state.closedOn}
            editable={this.state.editable}
          />
        </View>
      </View>
    </View>
  );

  editComponent = (isLoader, editable) => (
    <View>
      <Text style={styles.title}>Basic Information</Text>
      {this.basicInformation()}
      <View style={styles.gap} />
      <Text style={styles.title}>Security Questions</Text>
      {this.securityQuestions()}
      <View style={styles.gap} />
      <Text style={styles.title}>Additional Information</Text>
      {this.additionalInformation()}
      <View style={styles.gap} />
      {!editable ? (
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Submit" />
        </View>
      ) : (
        <View />
      )}
      <Loader isLoader={isLoader} />
    </View>
  );

  onSave = () => {
    this.submit();
  };

  onEdit = () => {
    this.setState({ editable: false })
  };

  onArchive = () => {
    this.archive();
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

  render() {
    const {isLoader, editable} = this.state;
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
            <View style={styles.container}>{this.editComponent(isLoader, editable)}</View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(BrokerageAccount);
