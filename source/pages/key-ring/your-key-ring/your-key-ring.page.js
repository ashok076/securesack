import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import qs from 'qs';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import {getKeys, createNewKey} from '../../../configuration/api/api.functions'
import HeaderView from '../../../components/header-view/header-view.component';
import InputTextAdd from '../../../components/input-text-add/input-text-add.component'

import styles from "./your-key-ring.style";

class YourKeyRing extends Component {
    constructor(){
        super()
        this.state = {
            header: ['Key', 'Editors', 'Viewers'],
            showKeyArr: [[]],
            widthArr: [200, 150, 150],
            key: ''
        }
    }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getKeys();
    });
  }

  getKeys = async () => {
      const {access_token} = this.props.userData.userData;
      await getKeys(access_token)
      .then(response => this.showKey(response))
      .catch(error => console.log("Error in get key",error))
  }

  showKey = (data) => {
      console.log("Response get key", JSON.stringify(data))
      this.setState({ showKeyArr: [[]] })
      const {showKeyArr} = this.state;
      data.keys.map(val => {
        let join = this.state.showKeyArr.concat([[
            val.name + "\n" + val.code,
            "val.ownerName",
            "val.lockCode"
        ]])
        this.setState({ showKeyArr: join }, () => console.log("Shared key arr: ", this.state.showKeyArr))
    })
  }

addKey = async () => {
    const {access_token} = this.props.userData.userData;
    const { key } = this.state;
    if (this.validate(key)){
        let data = qs.stringify({
        name: key
        })
        await createNewKey(access_token, data)
        .then(response => {
            console.log("Create key response: ", response)
            this.setState({ key: '' }, () => this.getKeys())
        })
        .catch(error => {
            console.log("Error in create key: ", error)
            this.setState({ key: '' })
        })
    }
}

    validate = (key) => {
        if (key.length !== 0){
            return true;
        }
        return false
    }

    render(){
        const {navigation} = this.props;
        const {header, showKeyArr, key} = this.state;
        return(
            <View style={styles.view}>
                <View style={styles.container}>
                    <HeaderView navigation={navigation} title="Your keys" theme={'dark'} />
                </View>
                <ScrollView >
                    <ScrollView horizontal={true}>
                        <View style={styles.tableView}>
                            <Table
                                state={styles.tableStyle}
                                borderStyle={{
                                borderWidth: 0.7,
                                borderColor: "#000000",
                                alignItems: "center"
                                }}>
                            <Row
                                data={header}
                                style={styles.head}
                                widthArr={this.state.widthArr}
                                textStyle={[styles.text, styles.tableTitle]}
                                />
                            <Rows
                                data={showKeyArr}
                                widthArr={this.state.widthArr}
                                textStyle={[styles.text, styles.tableData]}
                                />
                            </Table>
                        </View>
                    </ScrollView>
                        <View style={styles.searchView}>
                            <InputTextAdd 
                                placeholder="Key name (ex. Family key)"
                                onChangeText={(key) => this.setState({ key })}
                                value={key}
                                onAdd={() => this.addKey()}
                            /> 
                            </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(YourKeyRing);