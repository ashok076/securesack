import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Toast, Root} from 'native-base';
import qs from 'qs';
import {connect} from 'react-redux';

import Loader from '../../components/loader/loader.component';
import InputTextDynamic from '../../components/input-text-dynamic/input-text-dynamic.component';
import HeaderView from '../../components/header-view/header-view.component';
import Button from '../button/button.component';
import {Color} from '../../assets/color/color.js';
import {
  changePassword,
  resetPasswordStepOne,
} from '../../configuration/api/api.functions';

import styles from './accounts-settings.style';

class AccountSettings extends Component {
  initialState = {
    oldPass: '',
    newPass: '',
    conPass: '',
    isLoader: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState,
    };
  }

  changePass = async () => {
    this.setState({isLoader: true});
    const {oldPass, newPass, conPass} = this.state;
    const access_token = this.props.userData.userData.access_token;
    const data = qs.stringify({
      oldPassword: oldPass,
      password: newPass,
      password2: conPass,
    });
    await changePassword(access_token, data)
      .then((response) => {
        console.log('Ref Password: ', response);
        this.showToast('Password reset successfully');
        this.setState({isLoader: false});
      })
      .catch((error) => {
        console.log('Error: ', error);
        this.setState({isLoader: false});
        alert(error);
      });
  };

  dataEncryption = async () => {
    const email = await AsyncStorage.getItem('email');
    console.log(email, 'async');
    var data = qs.stringify({email: email});
    await resetPasswordStepOne(data)
      .then((response) => {
        console.log('Ref Business: ', response);
        this.showToast('Data encryption key sent');
        this.setState({isLoader: false});
      })
      .catch((error) => {
        console.log('Error: ', error.message);
        this.setState({isLoader: false});
      });
  };

  showToast = (message) => {
    Toast.show({
      text: message,
      buttonText: 'DISMISS',
      type: 'success',
      position: 'bottom',
      duration: 3000,
      textStyle: styles.toastText,
    });
  };

  title = (title) => (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  changePasswordView = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(oldPass) => this.setState({oldPass})}
          keyboardType="default"
          color={Color.orange}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="New Password"
          onChangeText={(newPass) => this.setState({newPass})}
          keyboardType="default"
          color={Color.orange}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Confirm Password"
          onChangeText={(conPass) => this.setState({conPass})}
          keyboardType="default"
          color={Color.orange}
          value={this.state.name}
          editable={this.state.editable}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => this.changePass()} title="Change Password" />
      </View>
    </View>
  );

  dataEncryptionKeyView = () => (
    <View>
      <Text style={styles.note}>
        To reset your password in the future you will need your personalized 16
        digit data encryption key first sent to you by SecureSack. If you have
        misplaced it SecureSack highly recommends you get a copy sent to your
        email now so that you can reset your password in the future.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => this.dataEncryption()}
          title="Email my Data Encryption Key"
        />
      </View>
    </View>
  );

  render() {
    const {navigation} = this.props;
    return (
      <Root>
        <ScrollView>
        <View style={styles.container}>
          <HeaderView
            navigation={navigation}
            title="Account Settings"
            theme={'dark'}
          />
          <View style={styles.outerView}>
            {this.title('Change Password')}
            {this.changePasswordView()}
          </View>
          <View style={styles.outerView}>
            {this.title('Data Encryption Key')}
            {this.dataEncryptionKeyView()}
          </View>
        </View>
      </ScrollView>
      </Root>
    );
  }
}
const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(AccountSettings);
