import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';

import {personalAssetsDataTypeList} from './personal-assets-data-type.list';

import styles from './personal-assets-data-type.style';

class PersonalAssetsData extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text>PersonalAssetsData</Text>
            </View>
        )
    }
}

export default connect()(PersonalAssetsData)