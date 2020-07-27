import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Root, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import axios from 'axios';

import InputText from '../../components/input-text/input-text.component.js';
import Button from '../../components/button/button.component.js';
import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';
import {postApi} from '../../configuration/api/api.functions';

import styles from './auth-code.style.js';

class AuthCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authcode: '',
      clientid: '',
      email: '',
    };
  }

  componentDidMount() {
    this.getEmail();
  }

  getEmail = async () => {
    try {
      let email = await AsyncStorage.getItem('user_email');
      if (email !== null) {
        console.log('User email: ', email);
        this.setState({email}, () => this.sendAuthCode());
      }
    } catch (error) {
      console.log('Error in getting email: ', error);
    }
  };

  sendAuthCode = () => {
    const {email} = this.state;
    let data = qs.stringify({
      email: email,
    });
    let config = {
      method: 'post',
      url: `${BASE_URL}${END_POINTS.SEND_AUTH_CODE_API}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    console.log('Data: ', data);
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.saveClientId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveClientId = async ({clientid}) => {
    this.setState({clientid});
    console.log('Client Id: ', clientid);
    try {
      await AsyncStorage.setItem('clientid', clientid);
    } catch (error) {
      console.log('Error in storing client Id: ', error);
    }
  };

  handleAuthCode = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({authcode: text});
  };

  handleClick = () => {
    const {authcode, clientid, email} = this.state;
    const {navigation} = this.props;
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

      axios(config)
        .then((response) => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
          console.log(JSON.stringify("response.data", response.data));
        })
        .catch((error) => {
          if (error !== undefined) this.showMessage(error.response);
          console.log(error)
        });
    }
  };

  showMessage = ({status}) => {
    console.log("status: ", status)
    if (status !== undefined) {
      switch (status) {
        case 400:
          Toast.show({
            text: 'The provided code did not match',
            position: 'top',
            type: 'error',
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
export default AuthCode;
