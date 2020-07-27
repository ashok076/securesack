import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Root, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from "qs";
import axios from "axios";

import InputText from '../../components/input-text/input-text.component.js';
import Button from '../../components/button/button.component.js';
import {END_POINTS} from '../../configuration/api/api.types';
import {queryGetApi, postApi} from '../../configuration/api/api.functions';

import styles from './email-key.style.js';

class EmailKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailkey: '',
      email: '',
    };
  }

  handleEmailKey = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({emailkey: text});
  };

  createCancelToken = () => axios.CancelToken.source()

  handleClick = () => {
    const {emailkey} = this.state;
    const {navigation} = this.props;
    const cancel = this.createCancelToken()
    if (this.fieldVerification(emailkey)) {
      queryGetApi({
        endpoint: END_POINTS.CONFIRM_EMAIL_API,
        emailkey: emailkey,
        cancel
      })
        .then((res) => {
          console.log('emailkey verification: ', res.data);
          navigation.navigate('AuthCode');
          cancel.cancel()
        })
        .catch((error) => {
          console.log('emailkey verification: ', error);
          Toast.show({
            text: error.message,
            position: 'top',
            type: 'error',
          });
        });
    }
  };

  fieldVerification = (emailkey) => {
    if (emailkey.length == 0) {
      Toast.show({
        text: 'Please enter emailkey',
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
    const {emailkey} = this.state;
    return (
      <Root>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <InputText
              placeholder="Enter 16-digit code"
              onChange={this.handleEmailKey}
              value={emailkey}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.handleClick} title="Verify Email key" />
          </View>
        </SafeAreaView>
      </Root>
    );
  }
}
export default EmailKey;
