import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  personalOrganisationDataTypeList,
  getDataAsType,
} from './personal-organisation-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';

import styles from './personal-organisation-data-type.style';

class PersonalOrganisationData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: personalOrganisationDataTypeList,
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
    console.log('getDataAsType', getDataAsType);
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
          data={category}
          renderItem={({item}) => this.renderTitleSubtitle(item, type, title)}
        />
      </View>
    );
  };

  navigation = (type, title, recid, mode) => {
    const {navigation} = this.props;
    console.log('Personal: ', navigation, this.props);
    navigation.navigate(type, {
      type: type,
      category: 'Personal Organisation',
      title: title,
      background: require('../../assets/jpg-images/Personal-Organisation-Background/personal-organisation-background.jpg'),
      recid: recid,
      theme: 'light',
      mode: mode,
    });
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
      case 'WebSiteAccount':
        return item.Name;
        break;
      case 'Notes':
        return item.Name;
        break;
      case 'Recipies':
        return item.Name;
        break;
    }
  };

  getSubTitle = (type, item) => {
    switch (type) {
      case 'WebSiteAccount':
        return item.URL;
        break;
      case 'Notes':
        return item.Category;
        break;
      case 'Recipies':
        return item.CuisineType;
        break;
    }
  };

  render() {
    const {dataType} = this.state;
    console.log('item', dataType);
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

export default connect(mapStateToProps)(PersonalOrganisationData);
