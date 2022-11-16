import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

import {mainContentList} from './main-content.list';
import Block from '../block/block.component';

const MainContent = ({navigation}) => {
  return (
    <View>
      <FlatList
        data={mainContentList}
        renderItem={({item}) => <Block item={item} navigation={navigation}/>}
        numColumns={2}
      />
    </View>
  );
};
export default MainContent;
