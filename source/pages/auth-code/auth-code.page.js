import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Root, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import axios from 'axios';
import {connect} from 'react-redux';

import InputText from '../../components/input-text/input-text.component.js';
import Button from '../../components/button/button.component.js';
import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';
import {postApi} from '../../configuration/api/api.functions';
import {toggleLoginSession} from '../../redux/login-session/actions/login-session.action';
import {userInfo} from '../../redux/user-info/actions/user-info.action';

import styles from './auth-code.style.js';

class AuthCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authcode: '',
      clientid: '',
      email: props.route.params.email,
    };
  }

  componentDidMount() {
    this.getClientid();
    console.log('Checking props: ', this.props);
    Toast.show({
      text: 'Please check your registered email id for the auth-code',
      type: 'success',
      position: 'bottom',
      textStyle: styles.toastText,
      buttonText: 'DISMISS',
      duration: 7000,
    });
  }

  getClientid = async () => {
    try {
      let clientid = await AsyncStorage.getItem('clientid');
      if (clientid !== null) {
        console.log('User clientid: ', clientid);
        this.setState({clientid});
      }
    } catch (error) {
      console.log('Error in getting clientid: ', error);
    }
  };

  handleAuthCode = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({authcode: text});
  };

  handleClick = async () => {
    const {authcode, clientid, email} = this.state;
    const {navigation, toggleLoginSession, userInfo} = this.props;
    console.log(this.props);
    if (this.fieldVerification(authcode)) {
      var data = qs.stringify({
        authcode: authcode,
        clientid: clientid,
        email: email,
      });
      var config = {
        method: 'post',
        url: `${BASE_URL}${END_POINTS.CONFIRM_AUTH_CODE_API}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data,
      };

      await axios(config)
        .then((response) => {
          if (response.data !== null) {
            toggleLoginSession(true);
            this.saveSession();
            userInfo(response.data);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }
        })
        .catch((error) => {
          if (error !== undefined) this.showMessage(error.response);
          console.log(error);
        });
    }
  };

  saveSession = async () => {
    try {
      await AsyncStorage.setItem('isLogin', 'true');
    } catch (error) {
      console.log('Error in login session: ', error);
    }
  };

  showMessage = ({status}) => {
    console.log('status: ', status);

    if (status !== undefined) {
      console.log('Working', typeof status);
      switch (status) {
        case 404:
          Toast.show({
            text: 'Invalid code. Make sure you have entered proper code',
            type: 'danger',
            position: 'top',
            textStyle: styles.toastText,
            buttonText: 'DISMISS',
            duration: 7000,
          });
          break;
      }
    }
  };

  fieldVerification = (authcode) => {
    if (authcode.length == 0) {
      Toast.show({
        text: 'Please enter OTP',
        buttonText: 'DISMISS',
        type: 'danger',
        position: 'top',
        duration: 3000,
        textStyle: styles.toastText,
      });
    } else {
      return true;
    }
    return false;
  };

  render() {
    const {authcode} = this.state;
    return (
      <Root>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <InputText
              placeholder="Enter 6-digit code"
              onChange={this.handleAuthCode}
              value={authcode}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.handleClick} title="Verify Auth Code" />
          </View>
        </SafeAreaView>
      </Root>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleLoginSession: (isLogin) => dispatch(toggleLoginSession(isLogin)),
  userInfo: (userData) => dispatch(userInfo(userData)),
});
export default connect(null, mapDispatchToProps)(AuthCode);
