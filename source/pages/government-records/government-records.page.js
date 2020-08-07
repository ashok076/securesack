import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import styles from './government-records.style';

class GovernmentRecords extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <SafeAreaView>
                <Text>Government Records</Text>
            </SafeAreaView>
        )
    }
}

export default GovernmentRecords;