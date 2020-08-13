import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';

import {insuranceDataTypeList} from './insurance-data-type.list';

import styles from './insurance-data-type.style';

class InsuranceDataType extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text>InsuranceDataType</Text>
            </View>
        )
    }
}

export default connect()(InsuranceDataType)