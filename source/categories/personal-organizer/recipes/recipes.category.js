import React, {Component} from 'react';
import {View, ScrollView, Modal} from 'react-native';
import {Text} from 'react-native-paper';
import qs from 'qs';

import InputTextDynamic from '../../../components/input-text-dynamic/input-text-dynamic.component.js';
import InputTextIconDynamic from '../../../components/input-text-icon-dynamic/input-text-icon-dynamic.component.js';
import ModalPicker from '../../../components/modal-picker/modal-picker.component.js';
import Button from '../../../components/button/button.component';
import Loader from '../../../components/loader/loader.component';
import ModalScreen from '../../../components/modal/modal.component';
import {createOrUpdateRecord} from '../../../configuration/api/api.functions';
import {cuisine} from './recipes.list';
import {Color} from '../../../assets/color/color.js';

import styles from './recipes.style';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      isLoader: false,
      modal: false,
      array: [],
      key: '',
      navigation: props.navigation,
      access_token: props.access_token,
      recid: props.recid,
      name: '',
      url: '',
      username: '',
      passwrd: '',
      recipe: '',
      cuisine: '',
    };
  }

  subComponet = () => {
    const {active} = this.state;
    switch (active) {
      case 0:
        return this.basicInformation();
        break;
    }
  };

  handleClick = () => {
    this.submit();
  };

  submit = async () => {
    this.setState({isLoader: true});
    const {name, url, username, password, recipe, cuisine, access_token, navigation, recid} = this.state;
    let data = qs.stringify({
      Name: name,
      URL: url,
      WebSiteUsername: username,
      WebSitePassword: passwrd,
      RecipeText: recipe,
    });

    await createOrUpdateRecord('Recipies', recid, data, access_token)
      .then((response) => {
        this.setState({isLoader: false});
        navigation.goBack();
      })
      .catch((error) => {
        this.setState({isLoader: false});
      });
  };

  basicInformation = () => (
    <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Name"
          onChangeText={(name) => this.setState({name})}
          keyboardType="default"
          color={Color.lightNavyBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.cuisine.length === 0 ? 'Cuisine' : this.state.cuisine
          }
          onPress={() =>
            this.setState({
              modal: true,
              array: cuisine,
              key: 'cuisine',
            })
          }
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="URL"
          onChangeText={(url) => this.setState({url})}
          keyboardType="default"
          color={Color.lightNavyBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          keyboardType="default"
          color={Color.lightNavyBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Password"
          onChangeText={(passwrd) => this.setState({passwrd})}
          keyboardType="default"
          color={Color.lightNavyBlue}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Recipe"
          onChangeText={(recipe) => this.setState({recipe})}
          keyboardType="default"
          color={Color.lightNavyBlue}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={this.handleClick} title="Submit" />
      </View>
    </View>
  );

  title = (active) => {
    switch (active) {
      case 0:
        return 'Basic Information';
        break;
    }
  };

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

  changeState = (key, value) => {
    this.setState({[key]: value});
  };

  render() {
    const {active, isLoader, modal, array, key} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.title(active)}</Text>
        {this.subComponet()}
        <Loader isLoader={isLoader} />
        <ModalScreen
          isModalVisible={modal}
          list={array}
          changeModalVisibility={this.changeModalVisibility}
          id={key}
          changeState={this.changeState}
        />
      </View>
    );
  }
}

export default Recipes;
