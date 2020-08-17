import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Title} from 'react-native-paper';

import InsuranceDataType from '../../components/insurance-data-type/insurance-data-type.component.js';

import styles from './insurance.style';

class Insurance extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Insurance-Background/insurance-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <Title style={styles.title}>Insurance</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <InsuranceDataType navigation={navigation}/>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default Insurance;
