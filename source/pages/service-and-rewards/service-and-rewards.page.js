import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Title} from 'react-native-paper';
import ServiceDataType from '../../components/service-data-type/service-data-type.component.js'

import styles from './service-and-rewards.style';

class ServiceRewards extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Service-Reward-Background/service-and-reward-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <Title style={styles.title}>Service and Rewards</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <ServiceDataType />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default ServiceRewards;
