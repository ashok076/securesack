import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Title} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

import {save} from '../../redux/save/actions/save.action';

import styles from './title-view.style';

class TitleView extends Component {
  toggleIcons = () => {
    const {mode, theme, type} = this.props
    switch (mode) {
      case 'Add':
        return (
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => this.saveInfo()}>
              <AntDesign
                name="save"
                color={
                  theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>
        );
        break;
      case 'View':
        return (
          <View style={styles.icons}>
            <View style={styles.rowObject}>
              <TouchableOpacity style={styles.iconView}>
                <SimpleLineIcons
                  name="pencil"
                  color={
                    theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)'
                  }
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SimpleLineIcons
                  name="trash"
                  color={
                    theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)'
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
        break;
      default:
        <View />;
        break;
    }
  };

  saveInfo = () => {
    const {save} = this.props
    save('Save')
  }

  render() {
    const {mode, theme, save, type, navigation, title} = this.props;
    return (
      <View style={styles.rowObject}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            color={theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)'}
            size={24}
          />
        </TouchableOpacity>
        <Title
          style={[
            styles.title,
            {
              color:
                theme !== 'dark' ? 'rgb(255, 255, 255)' : 'rgb(33, 47, 60)',
            },
          ]}>
          Add {title}
        </Title>
        {this.toggleIcons()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  save: (info) => dispatch(save(info)),
});
export default connect(null, mapDispatchToProps)(TitleView);
