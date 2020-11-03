import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import qs from 'qs';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import HeaderView from '../../../components/header-view/header-view.component';
import {getSharedKeys, importKey} from '../../../configuration/api/api.functions';
import InputTextAdd from '../../../components/input-text-add/input-text-add.component';

import styles from "./shared-key-ring.style";

class SharedKeyRing extends Component {
    constructor(){
        super()
        this.state = {
            header: ['Key', 'Owner', 'Code'],
            sharedKeyArr: [[]],
            widthArr: [100, 150, 200],
            importKey: false,
            code: '',
            keyId: ''
        }
    }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getSharedKeys();
    });
  }

  import = (code) => (
      <TouchableOpacity style={styles.importButton} onPress={() => this.setState({ importKey: true, code: code })}>
        <Text style={styles.importTxt}>Import</Text>
      </TouchableOpacity>
  )

  getSharedKeys = async () => {
      const {access_token} = this.props.userData.userData;
      const {sharedKeyArr} = this.state;
      await getSharedKeys(access_token)
            .then(response => {
                console.log("Shared key: ", response)
                    response.sharedKeys.map(val => {
                        console.log("Val", val)
                        let join = this.state.sharedKeyArr.concat([[
                            val.name,
                            val.ownerName,
                            val.lockCode === undefined ? this.import(val.id) : val.lockCode
                        ]])
                        this.setState({ sharedKeyArr: join }, () => console.log("Shared key arr: ", this.state.sharedKeyArr))
                    })
                })
            .catch(error => console.log("shared key error: ", error));
  }

  importKey = async () => {
      const {keyId, code} = this.state;
      let data = qs.stringify({
      keyId: code,
      code: keyId
    });
      console.log("Data: ", data)
      await importKey(this.props.userData.userData.access_token, data)
      .then(response => {
          console.log("added: ", response)
      })
      .catch(error => {
          console.log("Error: ", error)
      })
  }

    render(){
        const {navigation} = this.props;
        const {header, sharedKeyArr, importKey, keyId} = this.state;
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
                                data={sharedKeyArr}
                                widthArr={this.state.widthArr}
                                textStyle={[styles.text, styles.tableData]}
                                />
                            </Table>
                        </View>
                    </ScrollView>
                        {importKey && (
                            <View style={styles.searchView}>
                            <InputTextAdd 
                                placeholder="Key ID"
                                onChangeText={(keyId) => this.setState({ keyId })}
                                value={keyId}
                                onAdd={() => this.importKey()}
                            /> 
                        </View>
                        )}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(SharedKeyRing);