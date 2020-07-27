import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';

import InputText from '../input-text/input-text.component.js';
import InputTextIcon from '../input-text-icon/input-text-icon.component.js';
import Button from '../button/button.component';
import {END_POINTS} from '../../configuration/api/api.types';
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
    };
  }

  handleEmail = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({email: text});
  };

  handleFirstNaame = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({firstname: text});
  };

  handleLastName = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({lastname: text});
  };

  handlePasswordText = ({nativeEvent: {eventCount, target, text}}) => {
    this.setState({password: text});
  };

  handleClick = () => {
    console.log('Clicked on registration button');
    const {firstname, lastname, email, password} = this.state;
    console.log(
      'All info: ',
      `${firstname}, ${lastname}, ${email}, ${password}, ${END_POINTS.REGISTRATION_API}`,
    );
    if (this.validation(firstname, lastname, email, password)) {

      let data = qs.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });

      postApi({
        endpoint: END_POINTS.REGISTRATION_API,
        data
      })
        .then((res) => {
          console.log('Registration response: ', res.data);
          this.status(res.data);
        })
        .catch((error) => {
          console.log('Error in registration: ', error.message);
        });
    }
  };

  status = ({status}) => {
    const {navigation, email} = this.state;
    switch (status) {
      case 'PasswordTooShort':
        Toast.show({
          text: 'Password too short',
          position: 'top',
          type: 'warning',
        });
        break;
      case 'UserEmailExists':
        Toast.show({
          text: 'Email already exists',
          position: 'top',
          type: 'error',
        });
        this.saveEmail(email);
        break;
      case 'Success':
        Toast.show({
          text: 'You have successfully registered',
          position: 'top',
          type: 'success',
        });
        this.saveEmail(email);
        navigation.navigate('EmailKey');
        break;
    }
  };

  saveEmail = async (email) => {
    try {
      await AsyncStorage.setItem('user_email', email);
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
        message = 'Please enter Email';
      }
      if (firstname.length == 0) {
        cancel = true;
        message = 'Please enter First Name';
      }
      if (lastname.length == 0) {
        cancel = true;
        message = 'Please enter Last Name';
      }
      if (password.length == 0) {
        cancel = true;
        message = 'Please enter Password';
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
        position: 'top',
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

  render() {
    const {email, isShowPassword, firstname, lastname, password} = this.state;
    return (
      <View>
        <View style={styles.inputContainer}>
          <InputText
            placeholder="First Name"
            onChange={this.handleFirstNaame}
            value={firstname}
          />
        </View>

        <View style={styles.inputContainer}>
          <InputText
            placeholder="Last Name"
            onChange={this.handleLastName}
            value={lastname}
          />
        </View>

        <View style={styles.inputContainer}>
          <InputText
            placeholder="Email"
            onChange={this.handleEmail}
            value={email}
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
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={this.handleClick} title="Create an account" />
        </View>
      </View>
    );
  }
}

export default CreateAnAccount;
