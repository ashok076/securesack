import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import styles from './personal-assets.style';

class PersonalAssets extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <SafeAreaView>
                <Text>Personal Assets</Text>
            </SafeAreaView>
        )
    }
}

export default PersonalAssets;