import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  TextInput
} from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';

export default class Setting extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
  }
  logout(){

    AsyncStorage.removeItem('token').then((res)=>{
        console.log('hey')
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'LoginScreen',
        params:{onLogin:this.onLogin}})
    ],


      });
      this.props.navigation.dispatch(resetAction);
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){

    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={this.logout}>
        <Text style={styles.buttonText} >Logout </Text>
      </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10

  },
  button:{
    width:200,
    height:30,
    marginVertical:10,
    paddingVertical:2,
    backgroundColor:'#303f9f',
    borderRadius:25,
  },
  buttonText:{
    textAlign:'center',
    color:'#ffffff',
    fontSize:16
  }

});
