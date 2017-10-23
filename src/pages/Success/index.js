import React, { Component, PropTypes } from 'react';

import {
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    TextInput,
    ActivityIndicator,
    Linking
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import * as apis from '../../api';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Success extends Component {

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
            const routeStack = this.props.navigator.getCurrentRoutes();
            this.props.navigator.jumpTo(routeStack[2]);
        })
        .catch(err => {
            alert( err );
        });
    }

    onWallet(){
        const url = 'shoebox://';
        Linking.canOpenURL(url).then(supported => {
            if(supported) {
                return Linking.openURL(url)
            } else {
                console.log('Cannot open url');
            }
        })
        .catch( err => {
            console.log(err);
        });
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Image style={{flex: 1, position: 'absolute'}} source={require('../../images/Bitmap_2.png')}/>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="ios-checkmark-circle" size={150} color="#6c3"/>
                </View>
                <View style={{ height: 100, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { this.onWallet(); }}>
                        <Image source={require('../../images/wallet.png')} style={{ height: 60, width: 200 }} resizeMode='stretch'/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}