import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import axios from 'axios';

import InputText from '../input-text/input-text.component.js';
import InputTextIcon from '../input-text-icon/input-text-icon.component.js';
import Button from '../button/button.component';
import {BASE_URL, END_POINTS} from '../../configuration/api/api.types';
import {postApi} from '../../configuration/api/api.functions';

import styles from './create-an-account.style';

class CreateAnAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegister: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      isShowPassword: true,
      navigation: props.navigation,
      isShowPasswordError: false,
      passwordMessage: '',
    };
  }

  handleEmail = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({email: text});
  };

  handleFirstNaame = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({firstname: text.replace(/[^A-Za-z]/gi, '')});
  };

  handleLastName = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({lastname: text.replace(/[^A-Za-z]/gi, '')});
  };

  handlePasswordText = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({password: text});
  };

  handleClick = async () => {
    console.log('Clicked on registration button');
    const {firstname, lastname, email, password} = this.state;
    if (this.validation(firstname, lastname, email, password)) {
      if (this.savePasswordError(password)) {
        let data = qs.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        });

        // postApi({
        //   endpoint: END_POINTS.REGISTRATION_API,
        //   data,
        // })
        //   .then((res) => {
        //     console.log('Registration response: ', res.data);
        //     this.status(res.data);
        //   })
        //   .catch((error) => {
        //     console.log('Error in registration: ', error.message);
        //   });

        let config = {
          method: 'post',
          url: `${BASE_URL}${END_POINTS.REGISTRATION_API}`,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          data,
        };
        console.log('Config: ', config);

        await axios(config)
          .then((res) => {
            console.log('Registration response: ', res.data);
            this.status(res.data);
          })
          .catch((error) => {
            console.log('Error in registration: ', error.message);
          });
      }
    }
  };

  status = ({status, clientid}) => {
    switch (status) {
      case 'PasswordTooShort':
        Toast.show({
          text: 'Password too short',
          position: 'bottom',
          type: 'warning',
          duration: 7000
        });
        break;
      case 'UserEmailExists':
        Toast.show({
          text: 'Email already exists',
          position: 'bottom',
          type: 'danger',
          duration: 7000
        });
        break;
      case 'MFACodeRequired':
        Toast.show({
          text: 'You have successfully registered',
          position: 'bottom',
          type: 'success',
          duration: 7000
        });
        this.saveClientid(clientid);
        this.saveEmail();
        break;
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

  saveClientid = async (clientid) => {
    const {navigation, email} = this.state;
    try {
      await AsyncStorage.setItem('clientid', clientid);
      navigation.navigate('AuthCode', {email: email});
    } catch (error) {
      console.log('Error in storing email in async storage: ', error);
    }
  };

  validation = (firstname, lastname, email, password) => {
    let cancel = false;
    let message = '';
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      email.length == 0 &&
      firstname.length == 0 &&
      lastname.length == 0 &&
      password.length
    ) {
      cancel = true;
      message = 'Fields can not be empty';
    } else if (
      email.length == 0 ||
      firstname.length == 0 ||
      lastname.length == 0 ||
      password.length
    ) {
      if (email.length == 0) {
        cancel = true;
        message = 'Please fill all the inputs';
      }
      if (firstname.length == 0) {
        cancel = true;
        message = 'Please fill all the inputs';
      }
      if (lastname.length == 0) {
        cancel = true;
        message = 'Please fill all the inputs';
      }
      if (password.length == 0) {
        cancel = true;
        message = 'Please fill all the inputs';
      }
    }
    if (email.length > 0) {
      if (reg.test(email) === false) {
        cancel = true;
        message = 'Invalid email address';
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

  savePasswordError = (password) => {
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    let cancel = false;

    if (reg.test(password) === false) {
      cancel = true;
    }
    if (cancel) {
      console.log('PASSword ', password);
      this.setState({isShowPasswordError: true});
    } else {
      this.setState({isShowPasswordError: false});
      return true;
    }
    return false;
  };

  handleTogglePassword = () => {
    console.log('Toggle Password');
    const {isShowPassword} = this.state;
    this.setState({isShowPassword: !isShowPassword});
  };

  render() {
    const {
      email,
      isShowPassword,
      firstname,
      lastname,
      password,
      isShowPasswordError,
    } = this.state;
    return (
      <View>
        <View style={styles.inputContainer}>
          <InputText
            placeholder="First Name"
            onChange={this.handleFirstNaame}
            value={firstname}
            keyboardType="default"
          />
        </View>

        <View style={styles.inputContainer}>
          <InputText
            placeholder="Last Name"
            onChange={this.handleLastName}
            value={lastname}
            keyboardType="default"
          />
        </View>

        <View style={styles.inputContainer}>
          <InputText
            placeholder="Email"
            onChange={this.handleEmail}
            value={email}
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
                Your password must be minimum 8 characters to 16 characters and
                must contain one uppercase, one digit and special character
                '?!@#$%^&*'{' '}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Create an account" />
        </View>
      </View>
    );
  }
}

export default CreateAnAccount;
