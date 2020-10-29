import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../pages/login-registration/login-registration.page';
import AuthCode from '../../pages/auth-code/auth-code.page';
import ForgotPassword from '../../pages/forgot-password/forgot-password.page';
import DrawerNavigator from '../drawer-navigator/drawer-navigation.navigation';
import Billing from '../../pages/billing/billing.page';
import Fileupload from '../../pages/file-upload-ashok/file-upload.page';
import FileUploading from '../../pages/file-uploading/file-uploading.page';
import AccountSettings from '../../components/accounts-settings/accounts-settings.component.js';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="AuthCode" component={AuthCode} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="AccountSettings" component={AccountSettings} />
    <Stack.Screen name="Billing" component={Billing}/>
    <Stack.Screen name="Fileupload" component={Fileupload}/>
    <Stack.Screen name="FileUploading" component={FileUploading}/>
  </Stack.Navigator>
);

export default MainStackNavigator;
