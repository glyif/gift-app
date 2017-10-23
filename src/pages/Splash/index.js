import React, { Component, PropTypes } from 'react';

import {
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    Text,
    ActivityIndicator,
    Linking
} from 'react-native';

import * as apis from '../../api';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export default class Splash extends Component {

    static propTypes = {
        navigator: PropTypes.shape({
            getCurrentRoutes: PropTypes.func,
            jumpTo: PropTypes.func,
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: '',
            code: ''
        };
    }

    componentDidMount() {
        Linking.getInitialURL().then((url) => {
          if (url) {
            //alert('Initial url is: ' + url);
          }
        }).catch(err => console.error('An error occurred', err));

        Linking.addEventListener('url', this._handleOpenURL.bind(this));
    }

    _handleOpenURL(event) {
       alert(JSON.stringify(event));
       url = event.url;
       subs = url.split('=');

       if (subs.length === 1 && subs[1] === '') {
           return;
       }

       this.setState({
           code: subs[1]
       });

       const routeStack = this.props.navigator.getCurrentRoutes();
       this.props.navigator.jumpTo(routeStack[1]);
    }

    componentWillUnmount(){
        Linking.removeEventListener('url', this._handleOpenURL);
    }

    onPressNext(){
        this.setState( {
            isLoading: true
        });

        apis.verifyButton()
        .then( url => {
            this.setState( {
                isLoading: false
            });

            index = url.indexOf('redirect_uri=') + 13;
            strs = url.split('redirect_uri=');
            final = strs[0] + 'redirect_uri=glyif://' + strs[1];
            //alert(final);

            Linking.canOpenURL(final).then(supported => {
                if(supported) {
                    return Linking.openURL(final)
                } else {
                    console.log('Cannot open url');
                }
            })
            .catch( err => {
                console.log(err);
            });

            // const routeStack = this.props.navigator.getCurrentRoutes();
            // this.props.navigator.jumpTo(routeStack[1]);
        } )
        .catch( err => {
            this.setState( {
                isLoading: false
            });
            alert(err);
        });
    }

    render(){
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image style={{flex: 1, position: 'absolute'}} source={require('../../images/Bitmap_2.png')}/>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'left', width: width - 60}}>Giftcard to</Text>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', textAlign: 'left', width: width - 60}}>Instant Cash</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left', width: width - 60, color: '#999'}}>THE EASIEST WAY TO RECEIVE CASH INSTANTLY</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', textAlign: 'left', width: width - 60, color: '#999'}}>FOR YOUR UNWANTED GIFT CARDS</Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={{ height: height / 2 - 120, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View>
                                <Image source={require('../../images/Bitmap_3.png')}/>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>UPLOAD</Text>
                            </View>
                            <Image source={require('../../images/noun_762190.png')} style={{ alignSelf: 'center', margin: 20}}/>
                            <View>
                                <Image source={require('../../images/Bitmap_4.png')}/>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>RECEIVE</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 100, width: width, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ flex: 1, position: 'absolute' }} source={require('../../images/Bitmap.png')}/>
                        <TouchableOpacity onPress={() => { this.onPressNext(); }}>
                            <View style={{
                                backgroundColor: '#cc9933',
                                borderRadius: 3,
                                width: 150,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                shadowOffset:{  width: 2,  height: 2,  },
                                shadowColor: 'black',
                                shadowOpacity: 0.8 }}>
                                {
                                    this.state.isLoading?
                                    <ActivityIndicator animating={ true } color = "black"/>
                                    :
                                    <Text style={{ fontSize: 16, margin: 10, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>GET STARTED</Text>
                                }
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}