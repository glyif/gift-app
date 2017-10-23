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

import DatePicker from 'react-native-datepicker';

import * as apis from '../../api';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class PersonalInput extends Component {

    static propTypes = {
        navigator: PropTypes.shape({
            getCurrentRoutes: PropTypes.func,
            jumpTo: PropTypes.func,
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            ssn: '',
            lastname: '',
            dob: '',

            isloading: false
        };
    }

    onVerify(){
        if ( this.state.ssn === '' ||
            this.state.lastname === '' ||
            this.state.dob === '' ) {
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
            this.props.navigator.jumpTo(routeStack[2]);

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
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>SSN</Text>
                    <TextInput
                        keyboardType="numeric"
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(ssn) => this.setState({ssn})}
                        value={this.state.ssn}
                    />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>DoB</Text>
                    <DatePicker
                    style={{width: 200}}
                    date={this.state.dob}
                    mode="date"
                    placeholder="select date"
                    format="MM/DD/YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(dob) => {this.setState({dob})}}
                  />
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ height: 40, alignSelf: 'center', margin: 10, width: 100 }}>Last Name</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingLeft: 10 }}
                        onChangeText={(lastname) => this.setState({lastname})}
                        value={this.state.lastname}
                    />
                </View>
                <View style={{ height: 200 }}/>
                <TouchableOpacity onPress={() => { this.onVerify(); }}>
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