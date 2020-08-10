import React, {Component} from 'react';
import {View, Text, SafeAreaView, ImageBackground} from 'react-native';

import FinancialDataType from '../../components/financial-data-type/financial-data-type.component';

import styles from './financial-data.style';

class FinancialData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Financial-Data-Background/financial-data-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}></View>
          <View style={styles.outerContainerView}>
            <FinancialDataType />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default FinancialData;
