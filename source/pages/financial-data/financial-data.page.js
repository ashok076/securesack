import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import styles from './financial-data.style.js';

class FinancialData extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: true
        }
    }

    render(){
        return(
            <SafeAreaView>
                <View style={styles.outerView}>
                    <View style={styles.outerContainer}>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

export default FinancialData;