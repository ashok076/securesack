import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import styles from './settings.style';

class SettingsPage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <SafeAreaView>
                <Text>Settings</Text>
            </SafeAreaView>
        )
    }
}

export default SettingsPage;