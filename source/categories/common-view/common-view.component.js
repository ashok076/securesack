import React from 'react';
import {View, ImageBackground, SafeAreaView, ScrollView} from 'react-native';
import {Title} from 'react-native-paper';

//financial-data
import BankAccounts from '../financial-data/bank-account/bank-account.category';
import Brokerages from '../financial-data/brokerages/brokerages.category';
import Mortgages from '../financial-data/mortgages/mortgages.category.js';
import Loans from '../financial-data/loans/loans.category.js';

//services and rewards
import Services from '../services-and-rewards/services/services.category.js';
import RewardsPrograms from '../services-and-rewards/reward-programs/rewards-programs.category.js';

//insurance
import Auto from '../insurance/auto/auto.category.js';
import HealthCare from '../insurance/health-care/health-care.category.js';
import Life from '../insurance/property/property.category.js';
import PropertyInsurance from '../insurance/property/property.category.js';

//personal assets
import Vehicle from '../personal-assets/vehicle/vehicle.category.js';
import Property from '../personal-assets/property/property.category.js';

//government records
import DriverLicense from '../government-records/driving-license/driving-license.category.js';
import Identity from '../government-records/identity/identity.category.js';
import Passport from '../government-records/passport/passport.category.js';
import TaxSSN from '../government-records/tax-ssn/tax-ssn.category.js'

//personal organisation
import WebsitePassword from '../personal-organizer/website-password/website-password.category.js';
import Notes from '../personal-organizer/notes/notes.category.js';
import Recipes from '../personal-organizer/recipes/recipes.category.js';

import styles from './common-view.style';

const CommonView = ({navigation, route}) => {
  const {title, type, background} = route.params;
  return (
    <SafeAreaView style={styles.outerView}>
      <ImageBackground source={background} style={styles.backgroundImage}>
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
      return <Brokerages />;
      break;
    case 'Mortgage':
      return <Mortgages />;
      break;
    case 'ConsumerLoan':
      return <Loans />;
      break;
    case 'ServiceAccount':
      return <Services />;
      break;
    case 'RewardProgram':
      return <RewardsPrograms />;
      break;
    case 'AutoInsurance':
    return <Auto />
      break;
    case 'HealthCareProvider':
    return <HealthCare />
      break;
    case 'PropertyInsurance':
    return <PropertyInsurance />
      break;
    case 'LifeInsurance':
    return <Life />
      break;
    case 'Vehicle':
    return <Vehicle />
      break;
    case 'Property':
    return <Property />
      break;
    case 'WebSiteAccount':
    return <WebsitePassword />
      break;
    case 'Notes':
    return <Notes />
      break;
    case 'Recipies':
    return <Recipes />
      break;
    case 'DriverLicense':
    return <DriverLicense />
      break;
    case 'Passport':
    return <Passport />
      break;
    case 'TaxIdentification':
    return <TaxSSN />
      break;
    case 'IdentificationCards':
    return <Identity />
      break;
  }
};

export default CommonView;
