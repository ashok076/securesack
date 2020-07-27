import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";

import styles from "./home.style"
class Home extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.title}>Home Screen</Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default Home;