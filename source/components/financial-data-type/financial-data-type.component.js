import React, {Component} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {financialDataTypeList, getDataAsType} from './financial-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';
import {lookupType} from '../../configuration/api/api.functions';

import styles from './financial-data-type.style';

class FinancialDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: financialDataTypeList,
      viewAll: 2,
      isExpanded: false,
      refArray: []
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getType();
      this.getBusinessEntity();
    });
  }

  getType = () => {
    getDataAsType.map((type) => this.getData(type));
  };

  getBusinessEntity = async () => {
    const {userData} = this.props;
    if (userData !== null) {
      await lookupType(userData.userData.access_token, 'RefBusinessEntity')
        .then((response) => {
          console.log("Ref res: ", response)
          this.setState({ refArray: response })
        })
        .catch((error) => console.log('Ref Business error: ', error));
    }
  };

  getData = async (type) => {
    const {userData} = this.props;
    if (userData !== null) {
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

  renderTitleSubtitle = (item, type, title) => {
    return (
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => this.navigation(type, title, item.id, 'View')}>
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
    const {viewAll} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.titleIcon}>
          <Image source={icon} />
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={styles.addView}
            onPress={() => this.navigation(type, title, `__NEW__`, 'Add')}>
            <Icon name="plus" color="rgb(33, 47, 60)" size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={category === undefined ? category : category.slice(0, viewAll)}
          renderItem={({item}) => this.renderTitleSubtitle(item, type, title)}
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

  navigation = (type, title, recid, mode) => {
    const {navigation} = this.props;
    const {refArray} = this.state;
    navigation.navigate(type, {
      type: type,
      category: 'Financial Data',
      title: title,
      background: require('../../assets/jpg-images/Financial-Data-Background/financial-data-background.jpg'),
      recid: recid,
      theme: 'light',
      mode: mode,
      refArray: refArray
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
