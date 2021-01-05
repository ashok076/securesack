import React from 'react';
import qs from 'qs';
import {View, FlatList} from 'react-native';
import {Text, Chip} from 'react-native-paper';
import {connect} from 'react-redux';

import {switchKey} from '../../configuration/api/api.functions';

import styles from './switch-key.style';

const SwitchKey = ({userData, type, recid, shareKeyId, refresh}) => {
  console.log('User Data Switch Key: ', userData);
  return (
    <View style={styles.container}>
      <FlatList
        data={userData.shareKeys}
        renderItem={({item, index}) =>
          renderKey(item, type, recid, shareKeyId, index, userData, refresh)
        }
        horizontal={true}
      />
    </View>
  );
};

const renderKey = (
  item,
  type,
  recid,
  shareKeyId,
  index,
  userData,
  refreshData,
) => (
  <View key={index} style={styles.key}>
    <Chip
      onPress={() => {
        switchTheKey(type, recid, shareKeyId, item.id, userData, refreshData);
      }}
      mode={shareKeyId === item.id ? 'flat' : 'outlined'}>
      {item.name}
    </Chip>
  </View>
);

switchTheKey = async (
  type,
  recid,
  oldKeyId,
  newKeyId,
  userData,
  refreshData,
) => {
  let data = qs.stringify({
    dataType: type,
    itemId: recid,
    oldKeyId: oldKeyId,
    newKeyId: newKeyId,
  });
  console.log('Data: ', userData.access_token, data);
  await switchKey(userData.access_token, data)
    .then((response) => {
      console.log('Res Switch Key: ', response);
      refreshData();
    })
    .catch((error) => console.log('Switch key error: ', error));
};

const mapStateToProps = ({userData: {userData}}) => ({
  userData,
});

export default connect(mapStateToProps)(SwitchKey);
