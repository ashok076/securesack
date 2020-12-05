import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';

import HeaderView from '../../components/header-view/header-view.component';

import styles from './key-shared-with-me.style';

class KeySharedWithMe extends Component {
    constructor(){
        super();
        this.state = {
            key: true
        }
    }

    render(){
        const {navigation} = this.props
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View>
                        <HeaderView navigation={navigation} title="Keys Shared With Me" theme={'dark'} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default KeySharedWithMe;