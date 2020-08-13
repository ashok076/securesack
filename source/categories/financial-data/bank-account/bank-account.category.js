import React, {Component} from 'react';
import {View, ImageBackground, SafeAreaView, ScrollView} from 'react-native';
import {Title} from 'react-native-paper'

import BankWindow from '../../component/financial-data/page-one/bank-window.component.js'

import styles from './bank-account.style';

class BankAccounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../../assets/jpg-images/Financial-Data-Background/financial-data-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
              <Title style={styles.title}>Add bank account</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <BankWindow />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default BankAccounts;
