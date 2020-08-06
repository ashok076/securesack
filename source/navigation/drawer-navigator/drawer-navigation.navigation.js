import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MainStackNavigator from '../main-stack-navigator/main-stack-navigator.navigation'
import {DrawerComponent} from '../../components/drawer-content/drawer-content.component'
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerComponent {...props}/>}>
      <Drawer.Screen name="Home" component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;