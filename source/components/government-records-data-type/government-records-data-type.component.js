import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';

import {governmentRecordsDataTypeList} from './government-records-data-type.list';

import styles from './government-records-data-type.style';

class GovernmentRecordsData extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text>GovernmentRecordsData</Text>
            </View>
        )
    }
}

export default connect()(GovernmentRecordsData)