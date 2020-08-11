import React, {Component} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';
import {connect} from 'react-redux';

import {BASE_URL} from '../../configuration/api/api.types';
import {financialDataTypeList} from './financial-data-type.list';

import styles from './financial-data-type.style';

class FinancialDataType extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getBankAccounts();
  }

  getBankAccounts = async () => {
    const {userData} = this.props;
    console.log('User data access token: ', userData.userData.access_token);

    let config = {
      method: 'get',
      url: `${BASE_URL}/data/BankAccounts`,
      params: {
        archive: true,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + userData.userData.access_token,
      },
    };
    await axios(config)
      .then(res => console.log("Bank account response: ",res.data))
      .catch(error => console.log("Bank account error: ", error));
  };

  category = ({title, icon, key}) => (
    <View style={styles.container}>
      <View style={styles.titleIcon}>
        <Image source={icon} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.addView} onPress={() => alert(title)}>
          <Icon name="plus" color="rgb(33, 47, 60)" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  render() {
    return (
      <View>
        <FlatList
          data={financialDataTypeList}
          renderItem={({item}) => this.category(item)}
          keyExtractor={(item) => item.key.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(FinancialDataType);
