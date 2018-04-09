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
  TouchableOpacity,
  Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import connect from '../auth/auth';
import PostModel from '../model/Post';
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
type Props = {};
const Cards = [{
  "id": 1,
  "first_name": "Denise",
  "age": 21,
  "friends": 9,
  "interests": 38,
  "image": 'http://digitalspyuk.cdnds.net/16/07/980x490/landscape-1455888469-ps4-console-wds4.jpg'
}, {
  "id": 2,
  "first_name": "Cynthia",
  "age": 27,
  "friends": 16,
  "interests": 49,
  "image": 'https://cdn.shopify.com/s/files/1/1520/4366/files/13_SATECHI_INSTAGRAM_04-06_spacegray_setup_webKlaviyo_1024x1024.jpg?v=1503341248'
}, {
  "id": 3,
  "first_name": "Maria",
  "age": 29,
  "friends": 2,
  "interests": 39,
  "image": 'https://cdn3.volusion.com/lcseg.xtstx/v/vspfiles/photos/categories/338-T.jpg?1469627871'
}, {
  "id": 4,
  "first_name": "Jessica",
  "age": 20,
  "friends": 18,
  "interests": 50,
  "image": 'https://media1.popsugar-assets.com/files/thumbor/1QXPFzwSNNpDE3pYsrKL0vBDvw4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2010/12/51/1/192/1922507/9969c2b4479db1d1_GadgetGiftsMain/i/Top-10-Gadget-Items-You-Want-Holiday.jpg'
}, {
  "id": 5,
  "first_name": "Julie",
  "age": 28,
  "friends": 2,
  "interests": 13,
  "image": 'https://images.pcworld.com/images/article/2012/01/pricesup-8965886.jpg'
}, {
  "id": 6,
  "first_name": "Anna",
  "age": 24,
  "friends": 12,
  "interests": 44,
  "image": 'https://www.theallineed.com/wp-content/uploads/2017/03/Small-business-office.jpg'
}]
export default class Main extends Component{
  constructor(props){
    console.log('first');
    super(props);

    this.state={
      connected:false,
      token:'',
      user:'',
      cards:Cards

    }
    this.onLogin=this.onLogin.bind(this);
    this.notConnected=this.notConnected.bind(this);
    this.all=this.all.bind(this);
  }
  onLogin(props){
    console.log('second');
    if(this.props.navigation.state.params){
      let user=this.props.navigation.state.params.user
      this.setState({
        connected:true,
        token:user.token,
        user:user.user
      });
        this.all(val);
      console.log(this.state);

    }else{
        console.log('hey');
      AsyncStorage.getItem('token').then((val)=>{
        console.log(val);
        connect.islogged(val).then((response)=>{
          console.log('hey again');
          this.setState({
            connected:true,
            token:val,
            user:response.data.user
          });
          console.log(this.state);
          this.all(val);


        }).catch((error)=>{

          AsyncStorage.removeItem('token');
          this.notConnected()

        });

      }).catch((error) => {
        console.log(error);
  this.notConnected();
      });
        }
  }
  notConnected(route='LoginScreen'){
    console.log(route);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route,
      params:{onLogin:this.onLogin}})
  ],


    });
    this.props.navigation.dispatch(resetAction);
  }
  all(token){
    console.log('hey hey hey');
    PostModel.allPost(token).then((res)=>{
      console.log(res);
    })
  }
  Card(x){
    return (
      <View style={styles.card}>
        <Image source ={{uri:x.image}} resizeMode="contain" style ={{width:350, height:350}} />
        <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
        <Text style={{fontSize:20, fontWeight:'300', color:'white'}}>{x.first_name}, </Text>
        <Text style={{fontSize:21, fontWeight:'200', color:'white'}}>{x.age}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{padding:13,  borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='people-outline' size={20} color="#777" style={{}} /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.friends}</Text></View>
        <View style={{padding:13, borderLeftWidth:1,borderColor:'#e3e3e3', alignItems:'center', justifyContent:'space-between'}}><Icon name='import-contacts' size={20} color="#777" /><Text style={{fontSize:16, fontWeight:'200', color:'#555'}}>{x.interests}</Text></View>
        </View>
        </View>
      </View>
    )
  }
    handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    )
  }

  yup(){
    console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()  }

nope(){
    console.log(this.refs['swiper'])
this.refs['swiper']._goToNextCard()
}

  render() {
    console.log(this.state)
  !this.state.connected ? this.onLogin() : null;
    return (
      <View style={styles.container}>
      <SwipeCards
        ref = {'swiper'}
        cards={this.state.cards}
        containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
        renderCard={(cardData) => this.Card(cardData)}
        renderNoMoreCards={() => this.noMore()}
        handleYup={this.handleYup}
        handleNope={this.handleNope} />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
        <Iconz name='ios-close' size={45} color="#888" style={{}} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonSmall}>
        <Iconz name='ios-information' size={25} color="#888" style={{}} />
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
        <Iconz name='ios-heart-outline' size={36} color="#888" style={{marginTop:5}} />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:"#0d47a1"
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }
});
