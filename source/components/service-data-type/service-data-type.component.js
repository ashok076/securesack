import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';

import {serviceDataTypeList} from './service-data-type.list';

import styles from './service-data-type.style';

class ServiceDataType extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text>ServiceDataType</Text>
            </View>
        )
    }
}

export default connect()(ServiceDataType)