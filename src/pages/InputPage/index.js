import React, { Component, PropTypes } from 'react';

import {
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

import * as apis from '../../api';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class InputPage extends Component {

    static propTypes = {
        navigator: PropTypes.shape({
            getCurrentRoutes: PropTypes.func,
            jumpTo: PropTypes.func,
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            card_number: '',
            pin: '',
            balance: '',
            isloading: false
        };
    }

    onGift(){
        if ( this.state.card_number === '' ||
            this.state.pin === '' ||
            this.state.balance === '' ) {
            alert('Please input empty fields');
            return;
        }

        this.setState({
            isloading: true
        });
        apis.gift( this.state.card_number, this.state.pin, this.state.balance )
        .then(response => {
            this.setState({
                isloading: false
            });
            if (response['payment'] === 'OK'){
                const routeStack = this.props.navigator.getCurrentRoutes();
                this.props.navigator.jumpTo(routeStack[4]);
                return;
            }
            alert( 'Payment Operation Failed' );
        })
        .catch(err => {
            this.setState({
                isloading: false
            });
            alert( err );
        });
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Image style={{flex: 1, position: 'absolute'}} source={require('../../images/Bitmap_2.png')}/>
                <View style={{ height: 100 }}/>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>Select</Text>
                    <ModalDropdown 
                    options={['Apple', 'iTunes', 'BestBuy', 'Google Play']}
                    style={{borderWidth: 1, borderColor: '#000', width: 200, height: 40, justifyContent: 'center', marginTop: 5}}
                    textStyle={{ fontSize: 20}}
                    dropdownTextStyle = {{ fontSize: 20}}
                    dropdownStyle = {{ marginTop: 5, width: 200, height: 130}}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>Card Number</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(card_number) => this.setState({card_number})}
                        value={this.state.card_number}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>Pin</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(pin) => this.setState({pin})}
                        value={this.state.pin}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>Balance</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(balance) => this.setState({balance})}
                        value={this.state.balance}
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => { this.onGift(); }}>
                        <View style={{
                            alignSelf: 'center',
                            width: 150,
                            height: 40,
                            justifyContent: 'center',
                            backgroundColor: '#cc9933',
                            borderRadius: 3,
                            shadowOffset:{  width: 2,  height: 2,  },
                            shadowColor: 'black',
                            shadowOpacity: 0.8 }}>
                            {
                                !this.state.isloading?
                                <Text style={{ fontSize: 16, margin: 10, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Gift</Text>
                                :
                                <ActivityIndicator animating={ true } color = "black"/>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}