import React from 'react';
import {View, ImageBackground, SafeAreaView, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';

import BankAccounts from '../financial-data/bank-account/bank-account.category';

import styles from './common-view.style';

const CommonView = ({navigation, route}) => {
  const {title, type, background} = route.params
  return (
    <SafeAreaView style={styles.outerView}>
      <ImageBackground
        source={background}
        style={styles.backgroundImage}>
        <View style={styles.titleView}>
          <Title style={styles.title}>Add {title}</Title>
        </View>
        <ScrollView style={styles.outerContainerView}>
          {subView(type)}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const subView = (type) => {
  switch (type) {
    case 'BankAccounts':
      return <BankAccounts />;
      break;
    case 'CreditCard':
      break;
    case 'BrokerageAccount':
      break;
    case 'Mortgage':
      break;
    case 'ConsumerLoan':
      break;
    case 'ServiceAccount':
      break;
    case 'RewardProgram':
      break;
    case 'AutoInsurance':
      break;
    case 'HealthCareProvider':
      break;
    case 'PropertyInsurance':
      break;
    case 'LifeInsurance':
      break;
    case 'Vehicle':
      break;
    case 'Property':
      break;
    case 'WebSiteAccount':
      break;
    case 'Notes':
      break;
    case 'Recipies':
      break;
    case 'DriverLicense':
      break;
    case 'Passport':
      break;
    case 'TaxIdentification':
      break;
    case 'IdentificationCards':
      break;
  }
};

export default CommonView;
