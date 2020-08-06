import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import store from './source/redux/root-reducer/root.reducer';
import DrawerNavigator from './source/navigation/drawer-navigator/drawer-navigation.navigation'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
