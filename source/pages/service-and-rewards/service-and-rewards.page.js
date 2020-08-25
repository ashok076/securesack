import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Title} from 'react-native-paper';
import Icons from 'react-native-vector-icons/MaterialIcons';

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
            <View style={styles.rowObject}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons name="arrow-back" color="rgb(33, 47, 60)" size={24} />
              </TouchableOpacity>
            <Title style={styles.title}>Service and Rewards</Title>
            </View>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <ServiceDataType navigation={navigation}/>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default ServiceRewards;
