import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';
import {Toast, Root} from 'native-base';
import qs from 'qs';
import {connect} from 'react-redux';

import Loader from '../../components/loader/loader.component';
import InputTextDynamic from '../../components/input-text-dynamic/input-text-dynamic.component';
import HeaderView from '../../components/header-view/header-view.component';
import ModalPicker from '../../components/modal-picker/modal-picker.component';
import ModalScreen from '../../components/modal/modal.component';
import Button from '../../components/button/button.component';
import {Color} from '../../assets/color/color';
import {
  formatCardNumber,
  formatExpiry,
} from '../../configuration/card-formatter/card-formatter';

import styles from './billing.style';

class Billing extends Component {
    initialState = {
        cardHolderName: '',
        cardNo: '',
        expiryDate: '',
        cvv: '',
        streetAddress: '',
        address2: '',
        state: '',
        city: '',
        zip: '',
        country: '',
        isLoader: false,
        modal: false,
        array: [],
    }
    constructor(){
        super()
        this.state = {
            ...this.initialState
        }
    }

  title = (title) => (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  cardDetails = () => (
      <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Holder Name"
          onChangeText={(cardHolderName) =>
            this.setState({cardHolderName})
          }
          keyboardType="default"
          color={Color.orange}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Card Number"
          onChangeText={(cardNo) =>
            this.setState({cardNo: formatCardNumber(cardNo)})
          }
          keyboardType="number-pad"
          color={Color.orange}
          example="XXXX XXXX XXXX XXXX"
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="Expiration Date"
            onChangeText={(expiryDate) =>
              this.setState({expiryDate: formatExpiry(expiryDate)})
            }
            keyboardType="number-pad"
            color={Color.orange}
            example="MM/YY"
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="CVV"
            onChangeText={(cvv) =>
              this.setState({cvv})
            }
            keyboardType="number-pad"
            color={Color.orange}
          />
        </View>
        </View>
      </View>
  )

  billingAddress = () => (
      <View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Street Address"
          onChangeText={(streetAddress) =>
            this.setState({streetAddress})
          }
          keyboardType="default"
          color={Color.orange}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="Address Line 2"
          onChangeText={(address2) =>
            this.setState({address2})
          }
          keyboardType="number-pad"
          color={Color.orange}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputTextDynamic
          placeholder="State"
          onChangeText={(state) =>
            this.setState({state})
          }
          keyboardType="default"
          color={Color.orange}
        />
      </View>
      <View style={styles.miniContainer}>
        <View style={[styles.miniInputContainer, {marginRight: 10}]}>
          <InputTextDynamic
            placeholder="City"
            onChangeText={(city) =>
              this.setState({city})
            }
            keyboardType="number-pad"
            color={Color.orange}
          />
        </View>
        <View style={styles.miniInputContainer}>
          <InputTextDynamic
            placeholder="Zip"
            onChangeText={(zip) =>
              this.setState({zip})
            }
            keyboardType="number-pad"
            color={Color.orange}
          />
        </View>
        </View>
        <View style={styles.inputContainer}>
        <ModalPicker
          label={
            this.state.country.length === 0 ? 'Country' : this.state.country
          }
          onPress={() =>
            this.setState(
              {
                modal: true,
                array: this.props.country.country,
                key: 'country',
              }
            )
          }
          editable={this.state.editable}
          nam="Country"
        />
      </View>
      </View>
  )

  changeModalVisibility = (bool) => {
    this.setState({modal: bool});
  };

    changeState = (key, value) => {
    this.setState({[key]: value});
  };

    render(){
        const {modal, array, key, isLoader} = this.state;
        const {navigation} = this.props
        return(
    <Root>
        <SafeAreaView style={styles.container} keyboardShouldPersistTaps='handled'>
        <ScrollView>
        <View style={styles.innerContainer}>
          <HeaderView
            navigation={navigation}
            title="Billing Plans"
            theme={'dark'}
          />
          <View style={styles.outerView}>
            {this.title('Credit Card Details')}
            {this.cardDetails()}
          </View>
        <View style={styles.outerView}>
            {this.title('Billing Address')}
            {this.billingAddress()}
        </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => this.upgrade()} title="Upgrade" />
      </View>
        <Loader isLoader={isLoader} />
      <ModalScreen
        isModalVisible={modal}
        list={array}
        changeModalVisibility={this.changeModalVisibility}
        id={key}
        changeState={this.changeState}
      />
        </View>
      </ScrollView>
      </SafeAreaView>
    </Root>
        )
    }
}

const mapStateToProps = ({userData, country}) => ({
  userData,
  country
});
export default connect(mapStateToProps)(Billing);