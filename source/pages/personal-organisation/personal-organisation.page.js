import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import styles from './personal-organisation.style';

class PersonalOrganisation extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <SafeAreaView>
                <Text>Personal Organisation</Text>
            </SafeAreaView>
        )
    }
}

export default PersonalOrganisation;