import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, AppState} from 'react-native';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {CommonActions} from '@react-navigation/native';
import {connect} from 'react-redux';

import InputText from '../input-text/input-text.component.js';
import InputTextIcon from '../input-text-icon/input-text-icon.component.js';
import Button from '../button/button.component';
import Loader from '../loader/loader.component';
import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';
import {postApi, lookupType} from '../../configuration/api/api.functions';
import {userInfo} from '../../redux/user-info/actions/user-info.action';
import {countries} from '../../redux/countries-list/actions/countries-list.actions';

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
      isAcessTokenExpire: true,
      isLoader: false,
      enableFingerprint: false,
    };
  }

  componentDidMount() {
    this.getAsyncItem();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    FingerprintScanner.release();
  }

  addFingerprintEvent = async () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.detectFingerprintAvailable();
  };

  detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable()
      .then((result) => {
        this.setState({isSensorAvailable: true, isPromptShow: true}, () =>
          this.startScannerProcess(),
        );
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
    const {
      navigation,
      isPromptShow,
      isAcessTokenExpire,
      enableFingerprint,
    } = this.state;
    if (isPromptShow) {
      console.log('Is prompt show: ', 'isPromptShow');
      if (!isAcessTokenExpire) {
        console.log('Is prompt show: ', 'isAcessTokenExpire');
        if (enableFingerprint) {
          console.log('Is prompt show: ', 'enableFingerprint');
          FingerprintScanner.authenticate({
            description:
              'Scan your fingerprint on the device scanner to continue',
          })
            .then(() => {
              console.log('Check: ', navigation);
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                }),
              );
            })
            .catch((error) => console.log('Fingerprint scanner: ', error));
        } else {
          this.showToast(
            'Make sure you have enable biometric from app settings',
            'warning',
            false,
          );
        }
      } else {
        this.showToast(
          'Access token is expired please login from email credentials',
          'warning',
          false,
        );
      }
    }
  };

  checkAccessToken = async () => {
    this.setState({isLoader: true});
    const {access_token} = this.state;
    console.log('Acess token api: ', access_token);
    if (
      access_token !== null &&
      access_token !== undefined &&
      access_token.length > 0
    ) {
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
          this.setState({isLoader: false});
        })
        .catch((error) => {
          console.log('Error in status checking: ', error);
          this.setState({isLoader: false});
        });
    }
  };

  actionAsPerStatus = ({status, message}) => {
    switch (status) {
      case 'notAuthenticated':
        this.showToast(
          'Access token expired. Please log in again',
          'warning',
          true,
        );
        this.setState({isAcessTokenExpire: true});
        break;
      default:
        this.setState({isAcessTokenExpire: false}, () =>
          this.addFingerprintEvent(),
        );
    }
  };

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
      let value = await AsyncStorage.multiGet([
        'clientid',
        'access_token',
        'enable_fingerprint',
        'email',
      ]);
      if (value !== null) {
        let clientid = value[0][1];
        let access_token = value[1][1];
        let enableFingerprint = JSON.parse(value[2][1]);
        let username = value[3][1];
        if (clientid !== null) {
          this.setState({clientid});
        }
        if (access_token !== null) {
          this.setState({access_token}, () => this.checkAccessToken());
        }
        if (enableFingerprint !== null) {
          this.setState({enableFingerprint});
        }
        if (username !== null) {
          this.setState({username});
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
    this.setState({isLoader: true});
    const {username, password, clientid} = this.state;
    console.log('Login api client id: ', clientid);
    if (this.validation(username, password)) {
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
          console.log('Response Login Api: ', JSON.stringify(response.data));
          this.status(response.data);
          this.setState({isLoader: false});
        })
        .catch((error) => {
          console.log('Error in Login api: ', error);
          Toast.show({
            text: error,
            type: 'danger',
            position: 'bottom',
            textStyle: styles.toastText,
            buttonText: 'DISMISS',
            duration: 7000,
          });
          this.setState({isLoader: false});
        });
    } else {
      this.setState({isLoader: false});
    }
  };

  saveClientId = async (clientid) => {
    try {
      await AsyncStorage.setItem('clientid', clientid);
    } catch (error) {
      console.log('Error while storing client id in login: ', error);
    }
  };

  saveEmail = async () => {
    const {username} = this.state;
    try {
      await AsyncStorage.setItem('email', username);
    } catch (error) {
      console.log('Error while storing email in login: ', error);
    }
  };

  status = (response) => {
    const {navigation, username, password} = this.state;
    const {status, message, clientid, access_token} = response;
    if (status === undefined) {
      this.showToast(message, 'danger', true);
    }
    switch (status) {
      case 'IncorrectPassword':
        this.showToast(message, 'warning', true);
        break;
      case 'UserUnconfirmedPasswordOk':
        this.showToast(message, 'warning', false);
        break;
      case 'UserNotFound':
        // this.showToast(message, 'danger', true);
        this.setState({error: message});
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
        this.saveSession(access_token, clientid);
        userInfo(response);
        this.saveUserInfo(response);
        navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
        break;
      case 'MFACodeRequired':
        this.saveClientId(clientid);
        this.saveEmail();
        navigation.navigate('AuthCode', {email: username, clientid: clientid, password: password});
        break;
      default:
        // this.showToast(message, 'warning', true);
        this.setState({error: message});
        break;
    }
  };

  saveUserInfo = async (data) => {
    try {
      console.log("Check user info auth: ")
      await AsyncStorage.setItem('user_info', JSON.stringify(data));
    } catch (error) {
      console.log('Error in user info: ', error);
    }
  };

  saveSession = async (access_token, clientid) => {
    this.country(access_token);
    try {
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('clientid', clientid);
    } catch (error) {
      console.log('Error in access token: ', error);
    }
  };

  country = async (access_token) => {
    await lookupType(access_token, 'RefCountry')
      .then((res) => this.filter(res))
      .catch((err) => console.log('Error in fetching country: ', err));
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
        duration: 7000,
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
      isLoader,
      error,
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
        <Text style={styles.extrasText}> {error} </Text>
        <View style={styles.inputContainer}>
          <InputTextIcon
            placeholder="Password"
            icon={isShowPassword ? 'eye' : 'eye-slash'}
            onChange={this.handlePasswordText}
            value={password}
            show={isShowPassword}
            onPress={this.handleTogglePassword}
          />
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
        {/* {isSensorAvailable && (
          <TouchableOpacity
            style={styles.bottomContainer}
            onPress={() => this.startScannerProcess()}>
            <Image
              source={require('../../assets/png-images/fingerprint.png')}
              style={styles.fingerprint}
            />
            <Text style={styles.extrasText}> {errorMessage} </Text>
          </TouchableOpacity>
        )} */}
        <Loader isLoader={isLoader} />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userInfo: (userData) => dispatch(userInfo(userData)),
  countries: (country) => dispatch(countries(country)),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
