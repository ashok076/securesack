import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import axios from 'axios';
import qs from 'qs';

import {BASE_URL,ENDPOINT} from '../../configuration/api/api.types'

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

  checkLoginStatus = () => {

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}></Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
