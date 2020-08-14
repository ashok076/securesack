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
    };
  }

  componentDidMount() {
    this.getType();
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
  };

  category = ({title, id, category, type}) => {
    return (
      <View style={styles.container}>
        <View style={styles.titleIcon}>
          {/* <Image source={icon} /> */}
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.addView}>
            <Icon name="plus" color="rgb(33, 47, 60)" size={20} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={category}
          renderItem={({item}) => this.renderTitleSubtitle(item, type)}
        />
      </View>
    );
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
