import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import styles from './insurance.style';

class Insurance extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <SafeAreaView>
                <Text>Insurance</Text>
            </SafeAreaView>
        )
    }
}

export default Insurance;