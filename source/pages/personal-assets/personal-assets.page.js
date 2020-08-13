import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Title} from 'react-native-paper';

import PersonalAssetsData from '../../components/personal-assets-data-type/personal-assets-data-type.component.js'

import styles from './personal-assets.style';

class PersonalAssets extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Personal-Assets-Background/personal-assets-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <Title style={styles.title}>Personal Assets</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <PersonalAssetsData />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default PersonalAssets;