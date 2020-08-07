import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

import {mainContentList} from './main-content.list';
import Block from '../block/block.component';

import styles from './main-content.style';

const MainContent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mainContentList}
        renderItem={({item}) => <Block item={item} navigation={navigation}/>}
        numColumns={2}
      />
    </View>
  );
};
export default MainContent;
