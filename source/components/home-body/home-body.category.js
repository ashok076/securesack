import React, {Component} from 'react';
import {View} from 'react-native';

import MainContent from '../../components/main-content/main-content.component';
import InputTextSearch from '../../components/input-text-search/input-text-search.component';

import styles from './home-body.style';

class HomeBody extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  handleSearch = ({nativeEvent: {eventCount, target, text}}) => {};

  render() {
    const {navigation} = this.props;
    const {search} = this.state;
    return (
      <View>
        <View style={styles.searchView}>
          <InputTextSearch
            placeholder="Search"
            onChange={this.handleSearch}
            value={search}
          />
        </View>
        <View style={styles.mainContent}>
          <MainContent navigation={navigation} />
        </View>
      </View>
    );
  }
}

export default HomeBody;
