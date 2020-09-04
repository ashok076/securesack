import React from 'react';
import {
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialIcons';

//financial-data
import BankAccounts from '../financial-data/bank-account/bank-account.category';
import CreditCard from '../financial-data/credit-card/credit-card.category.js';
import Brokerages from '../financial-data/brokerages/brokerages.category';
import Mortgages from '../financial-data/mortgages/mortgages.category.js';
import Loans from '../financial-data/loans/loans.category.js';

//services and rewards
import Services from '../services-and-rewards/services/services.category.js';
import RewardsPrograms from '../services-and-rewards/reward-programs/rewards-programs.category.js';

//insurance
import Auto from '../insurance/auto/auto.category.js';
import HealthCare from '../insurance/health-care/health-care.category.js';
import Life from '../insurance/life/life.category.js';
import PropertyInsurance from '../insurance/property/property.category.js';

//personal assets
import Vehicle from '../personal-assets/vehicle/vehicle.category.js';
import Property from '../personal-assets/property/property.category.js';

//government records
import DriverLicense from '../government-records/driving-license/driving-license.category.js';
import Identity from '../government-records/identity/identity.category.js';
import Passport from '../government-records/passport/passport.category.js';
import TaxSSN from '../government-records/tax-ssn/tax-ssn.category.js';

//personal organisation
import WebsitePassword from '../personal-organizer/website-password/website-password.category.js';
import Notes from '../personal-organizer/notes/notes.category.js';
import Recipes from '../personal-organizer/recipes/recipes.category.js';

import styles from './common-view.style';

const CommonView = ({navigation, route, userData, country}) => {
  const {title, type, background, recid, theme} = route.params;
  console.log('Themeee: ', theme);
  let access_token = null;
  if (userData && userData.userData)
    access_token = userData.userData.access_token;
  return (
    <SafeAreaView style={styles.outerView}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.titleView}>
          <View style={styles.rowObject}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons
                name="arrow-back"
                color={
                  theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)'
                }
                size={24}
              />
            </TouchableOpacity>
            <Title
              style={[
                styles.title,
                {
                  color:
                    theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)',
                },
              ]}>
              Add {title}
            </Title>
          </View>
        </View>
        <ScrollView style={[styles.outerContainerView, {backgroundColor: theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)'}]}>
          {subView(type, access_token, navigation, country, recid)}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const subView = (type, access_token, navigation, countries_list, recid) => {
  switch (type) {
    case 'BankAccounts':
      return (
        <BankAccounts
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'CreditCard':
      return (
        <CreditCard
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'BrokerageAccount':
      return (
        <Brokerages
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'Mortgage':
      return (
        <Mortgages
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'ConsumerLoan':
      return (
        <Loans
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'ServiceAccount':
      return (
        <Services
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'RewardProgram':
      return (
        <RewardsPrograms
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'AutoInsurance':
      return (
        <Auto
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'HealthCareProvider':
      return (
        <HealthCare
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'PropertyInsurance':
      return (
        <PropertyInsurance
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'LifeInsurance':
      return (
        <Life
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'Vehicle':
      return (
        <Vehicle
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'Property':
      return (
        <Property
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'WebSiteAccount':
      return (
        <WebsitePassword
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'Notes':
      return (
        <Notes
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'Recipies':
      return (
        <Recipes
          access_token={access_token}
          navigation={navigation}
          recid={recid}
        />
      );
      break;
    case 'DriverLicense':
      return (
        <DriverLicense
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'Passport':
      return (
        <Passport
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'TaxIdentification':
      return (
        <TaxSSN
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
    case 'IdentificationCards':
      return (
        <Identity
          access_token={access_token}
          navigation={navigation}
          countries={countries_list}
          recid={recid}
        />
      );
      break;
  }
};

const mapStateToProps = ({userData, country}) => ({
  userData,
  country,
});

export default connect(mapStateToProps)(CommonView);
