import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

import store from './source/redux/root-reducer/root.reducer';
import MainStackNavigator from './source/navigation/main-stack-navigator/main-stack-navigator.navigation.js';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Root>
            <MainStackNavigator />
          </Root>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
