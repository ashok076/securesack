import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  personalAssetsDataTypeList,
  getDataAsType,
} from './personal-assets-data-type.list';
import {BASE_URL} from '../../configuration/api/api.types';

import styles from './personal-assets-data-type.style';

class PersonalAssetsData extends Component {
  initialState = {
    dataType: personalAssetsDataTypeList,
  }
  constructor(props) {
    super(props);
    this.state = {
      ...this.initialState
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getType();
      this.setState(this.initialState)
    })
  }

  getType = () => {
    getDataAsType.map((type) => this.getData(type));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.archive !== this.props.archive) {
      this.getType();
    }
  }

  getData = async (type) => {
    const {userData, archive, navigation} = this.props;
    if (userData !== null) {
      let config = {
        method: 'GET',
        url: `${BASE_URL}/data/${type}`,
        params: {
          archive: archive,
          sortBy: 'lastAccessed'
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
        .catch((error) => {
          console.log('Bank account error: ', error)
          navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        })
          });
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

  category = (item, index) => {
    const {title, id, category, type, icon, show} = item;
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
          data={category === undefined ? category : category.slice(0, show ? category.length : 3)}
          renderItem={({item}) => this.renderTitleSubtitle(item, type, title)}
          maxToRenderPerBatch={show ? category.length : 3}
        />
        {this.viewAll(category, show, index)}
      </View>
    );
  };

    viewAll = (category, show, index) => {
    const {isExpanded} = this.state;
    if (category !== undefined) {
      if (category.length > 3) return this.viewAllComponent(show, index);
    }
  };

  viewAllComponent = (show, index) => {
    return (
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => this.updateViewAll(index)}>
        {show ? (
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

  updateViewAll = (index) => {
    const array = [...this.state.dataType];
    array[index].show = !this.state.dataType[index].show;
    this.setState({dataType: array});
  };

  navigation = (type, title, recid, mode) => {
    const {navigation} = this.props;
    navigation.navigate(title, {
      type: type,
      title: title,
      recid: recid,
      mode: mode
    });
  };

  renderTitleSubtitle = (item, type, title) => {
    console.log(item);
    return (
      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" onPress={() => this.navigation(type, title, item.id, 'View')}>
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
      case 'Vehicle':
        return item.Make;
        break;
      case 'Property':
        return item.Name;
        break;
    }
  };

  getSubTitle = (type, item) => {
    switch (type) {
      case 'Vehicle':
        return item.VehicleID;
        break;
      case 'Property':
        return item.PropertyType;
        break;
    }
  };

  render() {
    const {dataType} = this.state;
    return (
      <View style={styles.view}>
        <FlatList
          data={dataType}
          renderItem={({item, index}) => this.category(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const mapStateToProps = ({userData}) => ({
  userData,
});
export default connect(mapStateToProps)(PersonalAssetsData);
