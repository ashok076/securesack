import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Title,
  Drawer,
  Text,
  TouchableRipple,
  Avatar,
  Caption,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import {Toast} from 'native-base';
import axios from 'axios';

import {END_POINTS, BASE_URL} from '../../configuration/api/api.types';

import styles from './drawer-content.style';

const DrawerComponent = ({navigation, userData}) => {
  let name = 'name';
  let access_token = null;
  console.log('Draewr: ', userData);
  if (userData && userData.userData) {
    name = userData.userData.fullname;
    access_token = userData.userData.access_token;
  }
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatarView}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
              <View style={styles.userInfoView}>
                <Title style={styles.title}>{name}</Title>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="cloud-upload" color={color} size={size} />
            )}
            label="File Upload"
            onPress={() => navigation.navigate('Fileupload')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="key" color={color} size={size} />
            )}
            label="Key Ring"
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="credit-card" color={color} size={size} />
            )}
            label="Billing Plans"
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="settings" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => navigation.navigate('SettingsPage')}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={({color, size}) => (
            <Icon name="logout" color={color} size={size} />
          )}
          label="Log Out"
          onPress={() => {
            logout(navigation, access_token);
            navigation.closeDrawer();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

logout = (navigation, access_token) =>
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {text: 'LOGOUT', onPress: () => signout(navigation, access_token)},
      {text: 'CANCEL'},
    ],
    {cancelable: false},
  );

signout = async (navigation, access_token) => {
  if (access_token !== null) {
    let config = {
      method: 'post',
      url: `${BASE_URL}${END_POINTS.LOGOUT}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${access_token}`,
      },
    };
    console.log('Drawer', config);
    await axios(config)
      .then(() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      )
      .catch((error) => {
        console.log('Logout: ', error.message);
        Toast.show({
          text: error.message,
          position: 'bottom',
          type: 'danger',
          duration: 7000
        });
      });
  }
};

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(DrawerComponent);
