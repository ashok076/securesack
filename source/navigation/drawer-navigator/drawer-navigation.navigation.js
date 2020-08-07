import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerComponent from '../../components/drawer-content/drawer-content.component'
import Home from '../../pages/home/home.page';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={prop => <DrawerComponent {...prop}/>}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;