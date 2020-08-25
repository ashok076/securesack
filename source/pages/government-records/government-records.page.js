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

import GovernmentRecordsData from '../../components/government-records-data-type/government-records-data-type.component.js';

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
            <View style={styles.rowObject}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icons name="arrow-back" color="rgb(255, 255, 255)" size={24} />
              </TouchableOpacity>
              <Title style={styles.title}>Government Records</Title>
            </View>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <GovernmentRecordsData navigation={navigation} />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default GovernmentRecords;
