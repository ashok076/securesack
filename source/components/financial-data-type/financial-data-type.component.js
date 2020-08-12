import React, {Component} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {financialDataTypeList, getDataAsType} from './financial-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';
// import FinancialDataCategory from '../financial-data-categories/financial-data-categories.component.js';

import styles from './financial-data-type.style';

class FinancialDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      type: '',
    };
  }

  componentDidMount() {
    this.getType();
  }

  getType = () => {
    getDataAsType.map((type) => this.getData(type));
  };

  renderTitleSubtitle = () => {
    const {type, items} = this.state;
    return items.map(item => {
      switch (type) {
      case 'BankAccounts':
        return (
          <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
            <View>
              <View style={styles.titleSubTitle}>
                <Title style={styles.catTitle}>{item.AccountName}</Title>
                <Caption>{item.AccountNumber}</Caption>
                <View style={styles.arrowView}>
                  <SimpleLineIcons
                    name="arrow-right"
                    color="rgb(33, 47, 60)"
                    size={15}
                  />
                </View>
              </View>
            </View>
          </TouchableRipple>
        );
        break;
      case 'CreditCard':
        break;
      case 'BrokerageAccount':
        break;
      case 'Mortgage':
        break;
      case 'ConsumerLoan':
        break;
    }
    })
  };

  getData = async (type) => {
    const {userData} = this.props;
    console.log('User data access token: ', userData.userData.access_token);

    let config = {
      method: 'get',
      url: `${BASE_URL}/data/${type}`,
      params: {
        archive: true,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + userData.userData.access_token,
      },
    };
    await axios(config)
      .then((res) => {
        console.log('res: ', res);
        this.filterTitleAndSubtitle(type, res.data.data.items);
      })
      .catch((error) => console.log('Bank account error: ', error));
  };

  filterTitleAndSubtitle = (type, items) => {
    this.setState({items, type});
  };

  category = ({title, icon, key}) => {
    return (
      <View style={styles.container}>
        <View style={styles.titleIcon}>
          <Image source={icon} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.addView} onPress={() => alert(title)}>
            <Icon name="plus" color="rgb(33, 47, 60)" size={20} />
          </TouchableOpacity>
        </View>
        {this.renderTitleSubtitle()}
      </View>
    );
  };

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
