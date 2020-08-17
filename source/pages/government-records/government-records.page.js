import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Title} from 'react-native-paper';

import GovernmentRecordsData from '../../components/government-records-data-type/government-records-data-type.component.js'

import styles from './government-records.style';

class GovernmentRecords extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Government-Record-Background/government-records-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <Title style={styles.title}>Government Records</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <GovernmentRecordsData navigation={navigation}/>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default GovernmentRecords;