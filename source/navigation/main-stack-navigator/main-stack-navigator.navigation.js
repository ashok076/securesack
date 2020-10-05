import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../pages/login-registration/login-registration.page';
import AuthCode from '../../pages/auth-code/auth-code.page';
import ForgotPassword from '../../pages/forgot-password/forgot-password.page';
import DrawerNavigator from '../drawer-navigator/drawer-navigation.navigation';
//Settings
import AccountSettings from '../../components/accounts-settings/accounts-settings.component.js';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="AuthCode" component={AuthCode} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="AccountSettings" component={AccountSettings} />
  </Stack.Navigator>
);

export default MainStackNavigator;
