import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

import {mainContentList} from './main-content.list';
import Block from '../block/block.component';

class MainContent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View>
                <FlatList 
                    data={mainContentList}
                    renderItem={({item}) => <Block item={item}/>}
                    numColumns={2}
                />
            </View>
        )
    }
}
export default MainContent