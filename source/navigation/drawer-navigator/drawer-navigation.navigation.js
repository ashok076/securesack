import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerComponent from '../../components/drawer-content/drawer-content.component';
import Home from '../../pages/home/home.page';
import SettingsPage from '../../pages/settings/settings.page';
import FinancialData from '../../pages/financial-data/financial-data.page';
import ServiceRewards from '../../pages/service-and-rewards/service-and-rewards.page';
import Insurance from '../../pages/insurance/insurance.page';
import PersonalAssets from '../../pages/personal-assets/personal-assets.page';
import GovernmentRecords from '../../pages/government-records/government-records.page';
import PersonalOrganisation from '../../pages/personal-organisation/personal-organisation.page.js';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(prop) => <DrawerComponent {...prop} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="FinancialData" component={FinancialData} />
      <Drawer.Screen name="SettingsPage" component={SettingsPage} />
      <Drawer.Screen name="ServiceRewards" component={ServiceRewards} />
      <Drawer.Screen name="Insurance" component={Insurance} />
      <Drawer.Screen name="PersonalAssets" component={PersonalAssets} />
      <Drawer.Screen name="GovernmentRecords" component={GovernmentRecords} />
      <Drawer.Screen name="PersonalOrganisation" component={PersonalOrganisation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
