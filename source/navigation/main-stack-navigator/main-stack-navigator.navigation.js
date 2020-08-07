import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../pages/login-registration/login-registration.page';
import AuthCode from '../../pages/auth-code/auth-code.page';
import ForgotPassword from '../../pages/forgot-password/forgot-password.page';
import FinancialData from '../../pages/financial-data/financial-data.page';
import ServiceRewards from '../../pages/service-and-rewards/service-and-rewards.page';
import Insurance from '../../pages/insurance/insurance.page';
import PersonalAssets from '../../pages/personal-assets/personal-assets.page';
import GovernmentRecords from '../../pages/government-records/government-records.page';
import PersonalOrganisation from '../../pages/personal-organisation/personal-organisation.page.js'
import DrawerNavigator from '../drawer-navigator/drawer-navigation.navigation';
import SettingsPage from '../../pages/settings/settings.page';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="AuthCode" component={AuthCode} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="FinancialData" component={FinancialData}/>
    <Stack.Screen name="SettingsPage" component={SettingsPage}/>
    <Stack.Screen name="ServiceRewards" component={ServiceRewards}/>
    <Stack.Screen name="Insurance" component={Insurance}/>
    <Stack.Screen name="PersonalAssets" component={PersonalAssets}/>
    <Stack.Screen name="GovernmentRecords" component={GovernmentRecords}/>
    <Stack.Screen name="PersonalOrganisation" component={PersonalOrganisation}/>
  </Stack.Navigator>
);

export default MainStackNavigator;