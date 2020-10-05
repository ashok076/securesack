import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import qs from 'qs';
import {Title} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';

import Loader from '../../components/loader/loader.component';
import AsyncStorage from '@react-native-community/async-storage';
import InputTextDynamic from '../../components/input-text-dynamic/input-text-dynamic.component';
import {
  changePassword,
  resetPasswordStepOne,
} from '../../configuration/api/api.functions';

import styles from './settings.style';

class SettingsPage extends Component {
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
    console.log(access_token, 'token');
    await changePassword(access_token, data)
      .then((response) => {
        console.log('Ref Password: ', response);

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
        this.setState({isLoader: false});
      })
      .catch((error) => {
        console.log('Error: ', error.message);
        this.setState({isLoader: false});
      });
  };

  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.root_container}>
        <ImageBackground
          source={require('../../assets/jpg-images/Service-Reward-Background/service-and-reward-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <View style={styles.rowObject}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons name="arrow-back" color="#000000" size={24} />
              </TouchableOpacity>
              <Title style={styles.title}>Setting</Title>
            </View>
          </View>

          <ScrollView>
            <View style={styles.body}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Change Password</Text>
              </View>
              <View style={{width: '96%', alignSelf: 'center'}}>
                <View style={styles.Spacing_Input}>
                  <InputTextDynamic
                    value={this.state.oldPass}
                    onChangeText={(text) => {
                      this.setState({oldPass: text});
                    }}
                    secureTextEntry={true}
                    placeholder="Old Password"
                  />
                </View>
                <View style={styles.Spacing_Input}>
                  <InputTextDynamic
                    value={this.state.newPass}
                    onChangeText={(text) => {
                      this.setState({newPass: text});
                    }}
                    secureTextEntry={true}
                    placeholder="New Password"
                  />
                </View>
                <View style={styles.Spacing_Input}>
                  <InputTextDynamic
                    value={this.state.conPass}
                    onChangeText={(text) => {
                      this.setState({conPass: text});
                    }}
                    secureTextEntry={true}
                    placeholder="Confirm New Password"
                  />
                </View>
                <TouchableOpacity onPress={() => this.changePass()}>
                  <View style={styles.buttonView}>
                    <Text style={styles.text_Btn_View}>Change Password</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.header_Sub}>
                  <Text style={styles.headerText}>Data Encryption Key</Text>
                </View>
                <View>
                  <Text style={styles.header_text_Sub}>
                    To reset your password in the future you will need your
                    personalized 16 digit data encryption key first sent to you
                    by SecureSack. If you have misplaced it SecureSack highly
                    recommends you get a copy sent to your email now so that you
                    can reset your password in the future.
                  </Text>
                </View>
                <TouchableOpacity onPress={() => this.dataEncryption()}>
                  <View style={styles.buttonView_Email}>
                    <Text style={styles.text_Btn_View}>
                      Email my Data Encryption Key now
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <Loader isLoader={this.state.isLoader} />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(SettingsPage);
