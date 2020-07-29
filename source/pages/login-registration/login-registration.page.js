import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Toast} from 'native-base';
import {Root} from 'native-base';
import {connect} from 'react-redux';

import LoginComponent from '../../components/login/login.component';
import CreateAnAccount from '../../components/create-an-account/create-an-account.component';

import styles from './login-registration.style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveLoginSwitcher: true,
    };
  }

  componentDidMount() {
    this.checkingLoginStatus();
  }

  checkingLoginStatus = () => {
    const {navigation, isLogin} = this.props;
    if (isLogin) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  };

  render() {
    const {isActiveLoginSwitcher} = this.state;
    const {navigation} = this.props;
    return (
      <Root>
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <View>
                <ImageBackground
                  source={require('../../assets/png-images/semi-cricle.png')}
                  style={styles.circle}>
                  <Text style={styles.logo}>
                    SECURE
                    <Text style={styles.logoSecure}>SACK</Text>
                  </Text>
                </ImageBackground>
              </View>
              <View style={styles.middleContainer}>
                <View style={styles.switcher}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({isActiveLoginSwitcher: true})
                    }>
                    <Text
                      style={[
                        styles.switcherText,
                        {
                          color: isActiveLoginSwitcher
                            ? '#FFFFFF'
                            : 'rgba(255, 255, 255, 0.4)',
                        },
                      ]}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({isActiveLoginSwitcher: false})
                    }>
                    <Text
                      style={[
                        styles.switcherText,
                        {
                          color: isActiveLoginSwitcher
                            ? 'rgba(255, 255, 255, 0.4)'
                            : '#FFFFFF',
                        },
                      ]}>
                      Create an account
                    </Text>
                  </TouchableOpacity>
                </View>
                {isActiveLoginSwitcher ? (
                  <LoginComponent navigation={navigation} />
                ) : (
                  <CreateAnAccount navigation={navigation} />
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Root>
    );
  }
}

const mapStateToProps = ({isLogin}) => ({
  isLogin: isLogin,
});

export default connect(mapStateToProps)(Login);
