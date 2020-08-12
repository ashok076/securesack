import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Text, Title, Caption, TouchableRipple} from 'react-native-paper';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';

import {getDataAsType} from '../financial-data-type/financial-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';

import styles from './financial-data-categories.style';

class FinancialDataCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      caption: '',
      items: [],
      type: '',
    };
  }

  componentDidMount() {
    const {key} = this.props;
    this.getData(getDataAsType[key - 1]);
  }

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

  renderTitleSubtitle = (item) => {
      const {type} = this.state;
      let title = '';
      let subTitle = '';
      switch (type) {
          case "BankAccounts":
              title = item.AccountName;
              subTitle = item.AccountNumber
              break;
          case "CreditCard":
              
              break;
          case "BrokerageAccount":
              
              break;
          case "Mortgage":
              
              break;
          case "ConsumerLoan":
              
              break;
      }
    return (
      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
        <View>
          <View style={styles.titleSubTitle}>
            <Title style={styles.catTitle}>{title}</Title>
            <Caption>{subTitle}</Caption>
            <View style={styles.arrowView}>
              <Icon name="arrow-right" color="rgb(33, 47, 60)" size={15} />
            </View>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  render() {
    const {items} = this.state;
    return (
      <FlatList
        data={items}
        renderItem={({item}) => this.renderTitleSubtitle(item)}
      />
    );
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(FinancialDataCategory);
