import React, {Component} from 'react';
import {View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Title, Drawer, Text, TouchableRipple, Avatar, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import styles from './drawer-content.style';

export const DrawerComponent = (props) => {
    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.avatarView}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={styles.userInfoView}>
                                <Title style={styles.title}>User</Title>
                                <Caption>Email</Caption>
                            </View>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                                name="home"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Home"
                    />
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                                name="settings"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Settings"
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <Drawer.Item 
                    icon={({color, size}) => (
                        <Icon
                        name="logout"
                        color={color} 
                        size={size}
                        />
                    )}
                    label="Sign Out"
                />
            </Drawer.Section>
        </View>
    )
}