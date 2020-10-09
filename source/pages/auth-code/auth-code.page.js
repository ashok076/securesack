import React, {Component} from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';
import {Root, Toast} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
import axios from 'axios';
import {connect} from 'react-redux';

import InputTextIcon from '../../components/input-text-icon/input-text-icon.component.js';
import Button from '../../components/button/button.component.js';
import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';
import {postApi} from '../../configuration/api/api.functions';
import Loader from '../../components/loader/loader.component';
import {userInfo} from '../../redux/user-info/actions/user-info.action';
import {countries} from '../../redux/countries-list/actions/countries-list.actions';
import {lookupType} from '../../configuration/api/api.functions';

import styles from './auth-code.style.js';

class AuthCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authcode: '',
      clientid: '',
      email: props.route.params.email,
      isLoader: false,
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
    const {navigation, userInfo} = this.props;
    this.setState({isLoader: true});
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
            this.saveSession(response.data.access_token);
            userInfo(response.data);
            this.saveUserInfo(response.data);
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
            this.setState({isLoader: false});
          }
        })
        .catch((error) => {
          if (error !== undefined) this.showMessage(error.response);
          console.log(error);
          this.setState({isLoader: false});
        });
    } else {
      this.setState({isLoader: true});
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

  saveSession = async (access_token) => {
    this.country(access_token);
    try {
      await AsyncStorage.setItem('access_token', access_token);
    } catch (error) {
      console.log('Error in access token: ', error);
    }
  };

  country = async (access_token) => {
    await lookupType(access_token, 'RefCountry')
      .then((res) => this.filter(res))
      .catch((err) => console.log('Error in fetching country: ', err));
  };

  filter = (data) => {
    const {countries} = this.props
    let arr = []
    data.map(country => arr.push(country.label))
    countries(arr);
  }

  showMessage = ({status}) => {
    console.log('status: ', status);
    if (status !== undefined) {
      console.log('Working', typeof status);
      switch (status) {
        case 404:
          Toast.show({
            text: 'Invalid code. Make sure you have entered proper code',
            type: 'danger',
            position: 'bottom',
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
        position: 'bottom',
        duration: 7000,
        textStyle: styles.toastText,
      });
    } else {
      return true;
    }
    return false;
  };

  render() {
    const {authcode, isLoader} = this.state;
    return (
      <Root>
        <View style={styles.background}>
          <ImageBackground
            source={require('../../assets/png-images/semi-cricle.png')}
            style={styles.circle}>
            <Text style={styles.logo}>
              SECURE
              <Text style={styles.logoSecure}>SACK</Text>
            </Text>
          </ImageBackground>
        </View>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <InputTextIcon
              placeholder="Enter 6-digit code"
              onChange={this.handleAuthCode}
              value={authcode}
              keyboardType="number-pad"
              icon={'lock'}
              show={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={this.handleClick} title="Verify security code" />
          </View>
          <Loader isLoader={isLoader} />
        </SafeAreaView>
      </Root>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userInfo: (userData) => dispatch(userInfo(userData)),
  countries: (country) => dispatch(countries(country)),
});
export default connect(null, mapDispatchToProps)(AuthCode);
