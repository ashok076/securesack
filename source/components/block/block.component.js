import React from 'react';
import {TouchableOpacity, ImageBackground, Text, Image} from 'react-native';

import styles from './block.style';

const Block = ({item, navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate(item.navigation)}  style={styles.container}>
    <ImageBackground
      source={item.background}
      imageStyle={styles.imageStyle}
      style={[styles.imageBackgroundStyle, {alignItems: 'flex-start'}]}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={[styles.title, {color: item.titleColor}]}>{item.title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

export default Block;
