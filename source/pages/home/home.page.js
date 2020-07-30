import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';
import qs from 'qs';
import {connect} from 'react-redux';

import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';

import styles from './home.style';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackgroundTimer.runBackgroundTimer(() => {
      this.checkLoginStatus();
    }, 30000);
  }

  checkLoginStatus = async () => {
    const {userData} = this.props;
    console.log("User data access token: ", userData.userData.access_token)
    var config = {
      method: 'get',
      url: `${BASE_URL}${END_POINTS.AUTH_STATUS}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ userData.userData.access_token
      }
    }

    await axios(config)
    .then(res => {
      console.log("Response in status checking: ", res.data)
      this.actionAsPerStatus(res.data);
    }).catch(error => {
      console.log("Error in status checking: ", error)
    })
  }

  actionAsPerStatus = ({ status, user }) => {
    const {navigation} = this.props;
    switch (status) {
      case 'notAuthenticated':
        navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Home Page</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ userData }) => ({
  userData
})

export default connect(mapStateToProps)(Home);
