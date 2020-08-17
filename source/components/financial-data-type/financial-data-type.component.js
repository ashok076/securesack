import React, {Component} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {financialDataTypeList, getDataAsType} from './financial-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';

import styles from './financial-data-type.style';

class FinancialDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: financialDataTypeList,
      viewAll: 2,
      isExpanded: false,
    };
  }

  componentDidMount() {
    this.getType();
  }

  getType = () => {
    getDataAsType.map((type) => this.getData(type));
  };

  getData = (type) => {
    const {userData} = this.props;
    if (userData !== null) {
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
      axios(config)
        .then((res) => {
          console.log('res: ', res.data.datatype.name);
          this.updateArray(res.data.data.items, res.data.datatype.name);
        })
        .catch((error) => console.log('Bank account error: ', error));
    }
  };

  updateArray = (items, type) => {
    const {dataType} = this.state;
    dataType.map((value) => {
      if (value.type.includes(type)) {
        value.category = items;
      }
    });
    console.log('dataType');
    this.setState({dataType});
  };

  renderTitleSubtitle = (item, type) => {
    console.log(item);
    return (
      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
        <View>
          <View style={styles.titleSubTitle}>
            <Title style={styles.catTitle}>{this.getTitle(type, item)}</Title>
            <Caption>{this.getSubTitle(type, item)}</Caption>
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
  };

  getTitle = (type, item) => {
    switch (type) {
      case 'BankAccounts':
        return item.AccountName;
      case 'CreditCard':
        return item.CardNumber;
        break;
      case 'BrokerageAccount':
        return item.BrokerageName;
        break;
      case 'Mortgage':
        return item.Name;
        break;
      case 'ConsumerLoan':
        console.log('loannsss ', item.Name);
        return item.Name;
        break;
    }
  };

  getSubTitle = (type, item) => {
    switch (type) {
      case 'BankAccounts':
        return item.AccountNumber;
      case 'CreditCard':
        console.log('valuesssss ', item.Name);
        return item.Name;
        break;
      case 'BrokerageAccount':
        return item.AccountNumber;
        break;
      case 'Mortgage':
        return item.LoanNumber;
        break;
      case 'ConsumerLoan':
        return item.LoanNumber;
        break;
    }
  };

  category = ({title, icon, id, category, type}) => {
    console.log('category', category);
    const {viewAll} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleIcon}>
          <Image source={icon} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={styles.addView}
            onPress={() => this.navigation(type, title)}>
            <Icon name="plus" color="rgb(33, 47, 60)" size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={category === undefined ? category : category.slice(0, viewAll)}
          renderItem={({item}) => this.renderTitleSubtitle(item, type)}
          maxToRenderPerBatch={viewAll}
        />
        {this.viewAll(category)}
      </View>
    );
  };

  viewAll = (category) => {
    const {isExpanded} = this.state;
    if (category !== undefined) {
      if (category.length > 2) return this.viewAllComponent(category);
    }
  };

  viewAllComponent = (category) => {
    const {isExpanded, viewAll} = this.state;
    return (
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() =>
          this.setState({
            viewAll: viewAll === 2 ? category.length : 2,
            isExpanded: !isExpanded,
          })
        }>
        {isExpanded ? (
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}> Close </Text>
          </View>
        ) : (
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}> View all </Text>
          </View>
        )}
      </TouchableRipple>
    );
  };

  navigation = (type, title) => {
    const {navigation} = this.props;
    navigation.navigate('CommonView', {
      type: type,
      category: 'Financial Data',
      title: title,
      background: require('../../assets/jpg-images/Financial-Data-Background/financial-data-background.jpg')
    });
  };

  render() {
    const {dataType} = this.state;
    return (
      <View style={styles.view}>
        <FlatList
          data={dataType}
          renderItem={({item}) => this.category(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(FinancialDataType);
