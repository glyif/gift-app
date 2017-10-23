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

import * as apis from '../../api';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class PersonalInputNum extends Component {

    static propTypes = {
        navigator: PropTypes.shape({
            getCurrentRoutes: PropTypes.func,
            jumpTo: PropTypes.func,
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            cc_number: '',
            ccexp: '',
            cc3 : '',

            isloading: false
        };
    }

    onGift(){
        if ( this.state.cc_number === '' ||
            this.state.ccexp === '' ||
            this.state.cc3 === '' ) {
            alert('Please input empty fields');
            return;
        }

        this.setState({
            isloading: true
        });
        apis.verify()
        .then(response => {
            this.setState({
                isloading: false
            });
 
            const routeStack = this.props.navigator.getCurrentRoutes();
            this.props.navigator.jumpTo(routeStack[3]);

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
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>CC Number</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(cc_number) => this.setState({cc_number})}
                        value={this.state.cc_number}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>CC EXP</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(ccexp) => this.setState({ccexp})}
                        value={this.state.ccexp}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>CC3</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(cc3) => this.setState({cc3})}
                        value={this.state.cc3}
                    />
                </View>
                <View style={{ height: 200 }}/>
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
                            <Text style={{ fontSize: 16, margin: 10, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Verify</Text>
                            :
                            <ActivityIndicator animating={ true } color = "black"/>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}