import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, AppState} from 'react-native';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import InputText from '../input-text/input-text.component.js';
import InputTextIcon from '../input-text-icon/input-text-icon.component.js';
import Button from '../button/button.component';
import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';
import {postApi} from '../../configuration/api/api.functions';

import styles from './login.style';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: true,
      username: '',
      password: '',
      message: '',
      navigation: props.navigation,
      isShowPasswordError: false,
      passwordMessage: '',
      errorMessage: undefined,
      biometric: undefined,
      popupShowed: false,
      isSensorAvailable: false,
      isPromptShow: false,
      clientid: '',
      access_token: '',
      isAcessTokenExpire: true
    };
  }

  componentDidMount() {
    this.getAsyncItem();
    this.addFingerprintEvent();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    FingerprintScanner.release();
  }

  addFingerprintEvent = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.detectFingerprintAvailable();
  };

  detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable()
      .then((result) => {
        this.setState({isSensorAvailable: true, isPromptShow: true});
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
          biometric: error.biometric,
        });
        console.log(error);
      });
  };

  startScannerProcess = async () => {
    const {navigation, isPromptShow, isAcessTokenExpire} = this.state;
    if (isPromptShow) {
      if (!isAcessTokenExpire){
        FingerprintScanner.authenticate({
        description: 'Scan your fingerprint on the device scanner to continue',
      })
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        })
        .catch((error) => console.log('Fingerprint scanner: ', error));
      }
    }
  };

  checkAccessToken = async () => {
    const {access_token} = this.state;
    console.log("Acess token api: ", access_token)
    if (access_token !== null && access_token !== undefined && access_token.length > 0) {
      var config = {
        method: 'get',
        url: `${BASE_URL}${END_POINTS.AUTH_STATUS}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer ' + access_token,
        },
      };
      await axios(config)
        .then((res) => {
          console.log('Response in status checking: ', res.data);
          this.actionAsPerStatus(res.data);
        })
        .catch((error) => {
          console.log('Error in status checking: ', error);
        });
    }
  };

  actionAsPerStatus = ({ status, message }) => {
    switch (status){
      case 'notAuthenticated' :
      this.showToast('Access token expired. Please log in again', 'warning' , true)
      this.setState({ isAcessTokenExpire: true });
      break;
      default:
      this.setState({ isAcessTokenExpire: false });
    }
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState &&
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      FingerprintScanner.release();
      this.detectFingerprintAvailable();
    }
    this.setState({appState: nextAppState});
  };

  getAsyncItem = async () => {
    try {
      let value = await AsyncStorage.multiGet(['clientid', 'access_token']);
      if (value !== null) {
        let clientid = value[0][1];
        let access_token = value[1][1];
        if (clientid !== null) {
          this.setState({clientid});
        }
        if (access_token !== null) {
          this.setState({access_token}, () => this.checkAccessToken());
        }
      }
    } catch (error) {
      console.log(
        'Error in login component for async storage  values: ',
        error,
      );
    }
  };

  handleClick = async () => {
    console.log('Login function called');
    const {username, password, clientid} = this.state;
    console.log('Login api client id: ', clientid);
    if (this.validation(username, password)) {
      if (this.savePasswordError(password)) {
      let data = qs.stringify({
        email: username,
        password,
        clientid,
      });
      let config = {
        method: 'post',
        url: `${BASE_URL}${END_POINTS.LOGIN_API}`,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
        },
        data,
      };
      console.log('Login api config: ', config);
      await axios(config)
        .then((response) => {
          console.log('Response Login Api: ', JSON.stringify(response));
          this.status(response.data);
        })
        .catch((error) => {
          console.log('Error in Login api: ', error.response);
          Toast.show({
            text: error.response.data.message,
            type: 'danger',
            position: 'bottom',
            textStyle: styles.toastText,
            buttonText: 'DISMISS',
            duration: 7000,
          });
        });
      }
    }
  };

  savePasswordError = (password) => {
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let cancel = false;

    if (reg.test(password) === false) {
      cancel = true;
    }
    if (cancel) {
      console.log('Password ', password);
      this.setState({isShowPasswordError: true});
    } else {
      this.setState({isShowPasswordError: false});
      return true;
    }
    return false;
  };

  saveClientId = async (clientid) => {
    try {
      await AsyncStorage.setItem('clientid', clientid);
    } catch (error) {
      console.log('Error while storing client id in login: ', error);
    }
  };

  status = ({status, message, clientid}) => {
    const {navigation, email} = this.state;
    if (status === undefined) {
      this.showToast(message, 'danger', true);
    }
    switch (status) {
      case 'IncorrectPassword':
        this.showToast(message, 'danger', true);
        break;
      case 'UserUnconfirmedPasswordOk':
        this.showToast(message, 'warning', false);
        break;
      case 'UserNotFound':
        this.showToast(message, 'danger', true);
        break;
      case 'DBSystemError':
        this.showToast(message, 'danger', true);
        break;
      case 'UserLockout':
        this.showToast(message, 'warning', false);
        break;
      case 'UserAlreadyLockedOut':
        this.showToast(message, 'danger', true);
        break;
      case 'Success':
        this.showToast(message, 'success', true);
        navigation.navigate('Home');
        break;
      case 'MFACodeRequired':
        this.saveClientId(clientid);
        navigation.navigate('AuthCode', {email: email});
        break;
      default:
        this.showToast(message, 'warning', true);
        break;
    }
  };

  showToast = (message, type, isButtonText) => {
    Toast.show({
      text: message,
      type: `${type}`,
      position: 'bottom',
      textStyle: styles.toastText,
      buttonText: isButtonText ? 'DISMISS' : 'OK',
      duration: 7000,
    });
  };

  validation = (username, password) => {
    console.log('Validation function called');
    let cancel = false;
    let message = '';
    console.log('Validation false 1', username.length);
    if (username.length == 0 && password.length == 0) {
      cancel = true;
      message = 'Fields can not be empty';
      console.log('Validation false 2', username.length);
    } else if (username.length == 0 || password.length == 0) {
      console.log('Validation false 1', username.length);
      if (username.length == 0) {
        cancel = true;
        message = 'Please enter username';
      }
      if (password.length == 0) {
        cancel = true;
        message = 'Please enter password';
      }
    }

    if (cancel) {
      Toast.show({
        text: message,
        buttonText: 'DISMISS',
        type: 'danger',
        position: 'bottom',
        duration: 3000,
        textStyle: styles.toastText,
      });
    } else {
      return true;
    }
    return false;
  };

  handleTogglePassword = () => {
    console.log('Toggle Password');
    const {isShowPassword} = this.state;
    this.setState({isShowPassword: !isShowPassword});
  };

  handleLoginText = ({nativeEvent: {eventCount, target, text}}) => {
    console.log('login: ', text);
    this.setState({username: text});
  };

  handlePasswordText = ({nativeEvent: {eventCount, target, text}}) => {
    console.log('password: ', text);
    this.setState({password: text});
  };

  render() {
    const {
      isShowPassword,
      username,
      password,
      isShowPasswordError,
      passwordMessage,
      navigation,
      errorMessage,
      biometric,
      isSensorAvailable,
    } = this.state;
    return (
      <View>
        <View style={styles.inputContainer}>
          <InputText
            placeholder="Email"
            onChange={this.handleLoginText}
            value={username}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <InputTextIcon
            placeholder="Password"
            icon={isShowPassword ? 'eye' : 'eye-slash'}
            onChange={this.handlePasswordText}
            value={password}
            show={isShowPassword}
            onPress={this.handleTogglePassword}
          />
          {isShowPasswordError && (
            <View style={styles.extras}>
              <Text style={styles.extrasText}>
                {' '}
                Your password must be minimum 8 characters to 16 characters and must contain one
                uppercase, one digit and special character '?!@#$%^&*'{' '}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Login" />
        </View>
        <View style={styles.extras}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.extrasText}> Forgot Password? </Text>
          </TouchableOpacity>
        </View>
        {isSensorAvailable && (
          <TouchableOpacity
            style={styles.bottomContainer}
            onPress={() => this.startScannerProcess()}>
            <Image
              source={require('../../assets/png-images/fingerprint.png')}
              style={styles.fingerprint}
            />
            <Text style={styles.extrasText}> {errorMessage} </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default LoginComponent;
