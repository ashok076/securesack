import React from 'react';
import {TouchableOpacity, ImageBackground, Text, Image} from 'react-native';

import styles from './block.style';

const Block = ({item, navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate(item.navigation)}>
    <ImageBackground
      source={item.background}
      imageStyle={styles.imageStyle}
      style={styles.imageBackgroundStyle}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={[styles.title, {color: item.titleColor}]}>{item.title}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

export default Block;
