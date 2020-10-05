import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {insuranceDataTypeList, getDataAsType} from './insurance-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';

import styles from './insurance-data-type.style';

class InsuranceDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: insuranceDataTypeList,
      viewAll: 2,
      isExpanded: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getType();
    });
  }

  getType = () => {
    getDataAsType.map((type) => this.getData(type));
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
    console.log(dataType);
    this.setState({dataType});
  };

  category = ({title, id, category, type, icon}) => {
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
    navigation.navigate(type, {
      type: type,
      category: 'Insurance',
      title: title,
      background: require('../../assets/jpg-images/Insurance-Background/insurance-background.jpg'),
      recid: recid,
      theme: 'dark',
      mode: mode
    });
  };

  renderTitleSubtitle = (item, type, title) => {
    return (
      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)"
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
      case 'AutoInsurance':
        return item.Name;
        break;
      case 'HealthCareProvider':
        return item.ProviderName;
        break;
      case 'PropertyInsurance':
        return item.PolicyNumber;
        break;
      case 'LifeInsurance':
        return item.PolicyNumber;
        break;
    }
  };

  getSubTitle = (type, item) => {
    switch (type) {
      case 'AutoInsurance':
        return item.PolicyNumber;
        break;
      case 'HealthCareProvider':
        return item.ProviderType;
        break;
      case 'PropertyInsurance':
        return item.Name;
        break;
      case 'LifeInsurance':
        return item.Name;
        break;
    }
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

export default connect(mapStateToProps)(InsuranceDataType);
