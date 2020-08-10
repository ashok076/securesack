import React, {Component} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {financialDataTypeList} from './financial-data-type.list';

import styles from './financial-data-type.style';

class FinancialDataType extends Component {
  constructor(props) {
    super(props);
  }

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
        />
      </View>
    );
  }
}

export default FinancialDataType;
