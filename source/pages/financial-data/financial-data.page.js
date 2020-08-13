import React, {Component} from 'react';
import {View, Text, SafeAreaView, ImageBackground, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';

import FinancialDataType from '../../components/financial-data-type/financial-data-type.component';

import styles from './financial-data.style';

class FinancialData extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Financial-Data-Background/financial-data-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <Title style={styles.title}>Financial Data</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <FinancialDataType navigation={navigation} />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default FinancialData;
