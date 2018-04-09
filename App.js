/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  StatusBar,
  YellowBox
} from 'react-native';
import Login from './component/Login';
import Home from './component/Home';
import Main from './component/MainContainer';
import CardContainer from './component/CardContainer';
import Explore from './component/Explore';
import LikedMe from './component/LikedMe';
import Iliked from './component/Iliked';
import Ipassed from './component/Ipassed';
import Profile from './component/Profile';
import Match from './component/Match';
import Setting from './component/Setting';
import axios from 'axios';
import connect from './auth/auth';
import {Icon} from 'react-native-vector-icons/MaterialIcons';
import {StackNavigator,SwitchNavigator,TabNavigator} from 'react-navigation';
type Props = {};
export default class App extends Component<Props> {

  render() {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated',
      'Remote debugger is in',
]);
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#002171' />
      <MainNavigation/>
      </View>
    );
  }
}
export const Tabs=TabNavigator({
  Main:{
    screen:Main,
    NavigationOption:{
      label:'trades'
    }
  },
  Explore:{screen:Explore,  NavigationOption:{
      label:'Explore',

    }},
  Profile:{screen:Profile, NavigationOption:{
      label:'Profile',

    }},
  Match:{screen:Match, NavigationOption:{
      label:'Match',

    }},
  Setting:{screen:Setting, NavigationOption:{
      label:'nooo',
    }}
  },{
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    labelStyle: {
      fontSize: 10,
    },
    style: {
      backgroundColor: '#5472d3',
      padding: 1
    },
  }

  });
export const AppNavigator=StackNavigator({
  LoginScreen:{ screen: Login},
  HomeScreen:{screen :Home},
},{
  headerMode:'none'
});
export const MainNavigation=SwitchNavigator({
  MainScreen:{screen: Tabs},
  signScreen: {screen: AppNavigator}

})
const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:"#0d47a1"
  }
});
