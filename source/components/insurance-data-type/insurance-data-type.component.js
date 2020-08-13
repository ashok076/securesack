import React, {Component} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';

import {insuranceDataTypeList} from './insurance-data-type.list';

import styles from './insurance-data-type.style';

class InsuranceDataType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataType: insuranceDataTypeList,
    };
  }

  category = ({title, id}) => {
    return (
      <View style={styles.container}>
        <View style={styles.titleIcon}>
          {/* <Image source={icon} /> */}
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.addView}>
            <Icon name="plus" color="rgb(33, 47, 60)" size={20} />
          </TouchableOpacity>
        </View>
        {/* <FlatList
          data={category}
          renderItem={({item}) => this.renderTitleSubtitle(item, type)}
        /> */}
      </View>
    );
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

export default connect()(InsuranceDataType);
