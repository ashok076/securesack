import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import Login from './source/pages/login-registration/login-registration.page';
import AuthCode from './source/pages/auth-code/auth-code.page';
import Home from './source/pages/home/home.page';
import store from './source/redux/root-reducer/root.reducer'

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AuthCode" component={AuthCode} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
