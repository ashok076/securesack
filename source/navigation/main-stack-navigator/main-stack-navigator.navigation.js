import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../pages/login-registration/login-registration.page';
import AuthCode from '../../pages/auth-code/auth-code.page';
import ForgotPassword from '../../pages/forgot-password/forgot-password.page';
import DrawerNavigator from '../drawer-navigator/drawer-navigation.navigation';
import Billing from '../../pages/billing/billing.page';
import FileUploading from '../../pages/file-uploading/file-uploading.page';
import AccountSettings from '../../components/accounts-settings/accounts-settings.component';
import SharedKeyRing from '../../pages/key-ring/shared-key-ring/shared-key-ring.page';
import YourKeyRing from '../../pages/key-ring/your-key-ring/your-key-ring.page';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="AuthCode" component={AuthCode} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="AccountSettings" component={AccountSettings} />
    <Stack.Screen name="Billing" component={Billing}/>
    <Stack.Screen name="FileUploading" component={FileUploading}/>
    <Stack.Screen name="SharedKeyRing" component={SharedKeyRing}/>
    <Stack.Screen name="YourKeyRing" component={YourKeyRing}/>
  </Stack.Navigator>
);

export default MainStackNavigator;
