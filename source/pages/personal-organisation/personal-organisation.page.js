import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Title} from 'react-native-paper';

import PersonalOrganisationData from '../../components/personal-organisation-data-type/personal-organisation-data-type.component.js'

import styles from './personal-organisation.style';

class PersonalOrganisation extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView style={styles.outerView}>
        <ImageBackground
          source={require('../../assets/jpg-images/Personal-Organisation-Background/personal-organisation-background.jpg')}
          style={styles.backgroundImage}>
          <View style={styles.titleView}>
            <Title style={styles.title}>Personal Organisation</Title>
          </View>
          <ScrollView style={styles.outerContainerView}>
            <PersonalOrganisationData />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default PersonalOrganisation;