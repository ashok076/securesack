import React, {Component} from 'react';
import {View, Animated, TextInput} from 'react-native';
import {string, func, object, number} from 'prop-types';

import styles from './floating-label-text-input.style';

class FloatingLabelTextInput extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    textInputStyles: object,
    otherTextInputProps: object,
  };

  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: 'black',
    titleInactiveColor: 'dimgrey',
    textInputStyles: {},
    otherTextInputAttributes: {},
  };

  constructor(props) {
    super(props);
    const {value} = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    };
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({isFieldActive: true});
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  };

  _handleBlur = () => {
    console.log("Value props: ", this.props.value)
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({isFieldActive: false});
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  };

  _onChangeText = (updatedValue) => {
    const {attrName, updateMasterState} = this.props;
    updateMasterState(attrName, updatedValue);
  };

  _returnAnimatedTitleStyles = () => {
    const {isFieldActive} = this.state;
    const {
      titleActiveColor,
      titleInactiveColor,
      titleActiveSize,
      titleInActiveSize,
    } = this.props;

    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
      paddingLeft: 5
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.Text
          style={[styles.titleStyles, this._returnAnimatedTitleStyles()]}>
          {this.props.title}
        </Animated.Text>
        <TextInput
          value={this.props.value}
          style={[styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid="transparent"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          onChangeText={this.props.onChangeText}
          keyboardType={this.props.keyboardType}
          editable={this.props.editable}
          {...this.props.otherTextInputProps}
        />
      </View>
    );
  }
}

export default FloatingLabelTextInput;