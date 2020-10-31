import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import qs from 'qs';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import HeaderView from '../../../components/header-view/header-view.component';
import {getSharedKeys} from '../../../configuration/api/api.functions'

import styles from "./shared-key-ring.style";

class SharedKeyRing extends Component {
    constructor(){
        super()
        this.state = {
            header: ['Key', 'Owner', 'Code'],
            sharedKeyArr: [[]],
            widthArr: [100, 150, 200]
        }
    }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', () => {
      this.getSharedKeys();
    });
  }

  getSharedKeys = async () => {
      const {access_token} = this.props.userData.userData;
      const {sharedKeyArr} = this.state;
      await getSharedKeys(access_token)
            .then(response => {
                console.log("Shared key: ", response)
                    response.sharedKeys.map(val => {
                        let join = this.state.sharedKeyArr.concat([[
                            val.name,
                            val.ownerName,
                            val.lockCode
                        ]])
                        this.setState({ sharedKeyArr: join }, () => console.log("Shared key arr: ", this.state.sharedKeyArr))
                    })
                })
            .catch(error => console.log("shared key error: ", error));
  }

    render(){
        const {navigation} = this.props;
        const {header, sharedKeyArr} = this.state;
        return(
            <View style={styles.view}>
                <View style={styles.container}>
                    <HeaderView navigation={navigation} title="Shared keys" theme={'dark'} />
                </View>
                <ScrollView horizontal={true}>
                    <ScrollView>
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
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({userData}) => ({
  userData,
});

export default connect(mapStateToProps)(SharedKeyRing);