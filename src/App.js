import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';


import Splash from './pages/Splash';
import InputPage from './pages/InputPage';
import Success from './pages/Success';
import PersonalInput from './pages/PersonalInput';
import PersonalInputNum from './pages/PersonalInputNum';

const routeStack = [
  { name: 'Splash', component: Splash },
  { name: 'PersonalInput', component: PersonalInput },
  { name: 'PersonalInputNum', component: PersonalInputNum },
  { name: 'InputPage', component: InputPage },
  { name: 'Success', component: Success }
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialRoute: routeStack[0],
    };
  }

  render() {
    if (! this.state.initialRoute){
      return <View></View>;
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Navigator
            initialRoute={this.state.initialRoute}
            initialRouteStack={routeStack}
            configureScene={route => ({
              ...(route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJump),
              gestures: null
            })}
            renderScene={(route, navigator) => (
              <route.component route={route} navigator={navigator} {...route.passProps} />
            )}
          />
      </View>
    )
  }
}
