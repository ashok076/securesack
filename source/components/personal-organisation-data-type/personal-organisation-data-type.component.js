import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {Title, Caption, TouchableRipple} from 'react-native-paper';

import {personalOrganisationDataTypeList} from './personal-organisation-data-type.list';

import styles from './personal-organisation-data-type.style';

class PersonalOrganisationData extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <View>
                <Text>PersonalOrganisationData</Text>
            </View>
        )
    }
}

export default connect()(PersonalOrganisationData)