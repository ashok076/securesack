import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerComponent from '../../components/drawer-content/drawer-content.component';
import Home from '../../pages/home/home.page';
import SettingsPage from '../../pages/settings/settings.page';
import FinancialData from '../../pages/financial-data/financial-data.page';
import ServiceRewards from '../../pages/service-and-rewards/service-and-rewards.page';
import Insurance from '../../pages/insurance/insurance.page';
import PersonalAssets from '../../pages/personal-assets/personal-assets.page';
import GovernmentRecords from '../../pages/government-records/government-records.page';
import PersonalOrganisation from '../../pages/personal-organisation/personal-organisation.page.js';

//financial data
import BankAccounts from '../../categories/financial-data/bank-account/bank-account.category';
import CreditCard from '../../categories/financial-data/credit-card/credit-card.category.js';
import BrokerageAccount from '../../categories/financial-data/brokerages/brokerages.category';
import Mortgage from '../../categories/financial-data/mortgages/mortgages.category.js';
import ConsumerLoan from '../../categories/financial-data/loans/loans.category.js';

//services and rewards
import ServiceAccount from '../../categories/services-and-rewards/services/services.category.js';
import RewardProgram from '../../categories/services-and-rewards/reward-programs/rewards-programs.category.js';

//insurance
import Auto from '../../categories/insurance/auto/auto.category.js';
import HealthCare from '../../categories/insurance/health-care/health-care.category.js';
import Life from '../../categories/insurance/life/life.category.js';
import PropertyInsurance from '../../categories/insurance/property/property.category.js';

//personal assets
import Vehicle from '../../categories/personal-assets/vehicle/vehicle.category.js';
import Property from '../../categories/personal-assets/property/property.category.js';

//government records
import DriverLicense from '../../categories/government-records/driving-license/driving-license.category.js';
import Identity from '../../categories/government-records/identity/identity.category.js';
import Passport from '../../categories/government-records/passport/passport.category.js';
import TaxSSN from '../../categories/government-records/tax-ssn/tax-ssn.category.js';

//personal organisation
import WebsitePassword from '../../categories/personal-organizer/website-password/website-password.category.js';
import Notes from '../../categories/personal-organizer/notes/notes.category.js';
import Recipes from '../../categories/personal-organizer/recipes/recipes.category.js';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(prop) => <DrawerComponent {...prop} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="FinancialData" component={FinancialData} />
      <Drawer.Screen name="SettingsPage" component={SettingsPage} />
      <Drawer.Screen name="ServiceRewards" component={ServiceRewards} />
      <Drawer.Screen name="Insurance" component={Insurance} />
      <Drawer.Screen name="PersonalAssets" component={PersonalAssets} />
      <Drawer.Screen name="GovernmentRecords" component={GovernmentRecords} />
      <Drawer.Screen name="PersonalOrganisation" component={PersonalOrganisation} />
      <Drawer.Screen name="BankAccounts" component={BankAccounts}/>
      <Drawer.Screen name="CreditCard" component={CreditCard}/>
      <Drawer.Screen name="BrokerageAccount" component={BrokerageAccount}/>
      <Drawer.Screen name="Mortgage" component={Mortgage}/>
      <Drawer.Screen name="ConsumerLoan" component={ConsumerLoan}/>
      <Drawer.Screen name="ServiceAccount" component={ServiceAccount}/>
      <Drawer.Screen name="RewardProgram" component={RewardProgram}/>
      <Drawer.Screen name="Auto" component={Auto}/>
      <Drawer.Screen name="HealthCare" component={HealthCare}/>
      <Drawer.Screen name="Life" component={Life}/>
      <Drawer.Screen name="PropertyInsurance" component={PropertyInsurance}/>
      <Drawer.Screen name="Vehicle" component={Vehicle}/>
      <Drawer.Screen name="Property" component={Property}/>
      <Drawer.Screen name="DriverLicense" component={DriverLicense}/>
      <Drawer.Screen name="Identity" component={Identity}/>
      <Drawer.Screen name="Passport" component={Passport}/>
      <Drawer.Screen name="TaxSSN" component={TaxSSN}/>
      <Drawer.Screen name="WebsitePassword" component={WebsitePassword}/>
      <Drawer.Screen name="Notes" component={Notes}/>
      <Drawer.Screen name="Recipes" component={Recipes}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
