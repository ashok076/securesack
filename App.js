import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './source/pages/login-registration/login-registration.page';
import EmailKey from './source/pages/email-key/email-key.page';
import AuthCode from './source/pages/auth-code/auth-code.page';
import Home from './source/pages/home/home.page'

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EmailKey" component={EmailKey} />
          <Stack.Screen name="AuthCode" component={AuthCode} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
