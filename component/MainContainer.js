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
  Alert,
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

export default class Main extends Component{
  constructor(props){
    console.log('first');
    super(props);

    this.state={
      connected:false,
      token:'',
      user:'',
      cards:[]

    }
    this.onLogin=this.onLogin.bind(this);
    this.notConnected=this.notConnected.bind(this);
    this.all=this.all.bind(this);
    this.handleNope=this.handleNope.bind(this);
    this.handleYup=this.handleYup.bind(this);
  }
  onLogin(props){
    console.log(this.props.navigation.state.params);
    if(this.props.navigation.state.params){

      let user=this.props.navigation.state.params.user
      this.setState({
        connected:true,
        token:user.token,
        user:user.user
      });
        this.all(val);
      console.log(this.state);

    }
    else{
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
      console.log(res.data.posts);
    let cards=res.data.posts.map((post)=>{
      return {
            'id':post._id,
            "first_name":post.user.firstname,
            "last_name":post.user.lastname,
            'title':post.title,
            'body':post.body,
            "date":post.day_created,
            'image':post.images[0]
      }
    })
    this.setState({
      cards:cards
    });
    console.log(cards);
    }).catch((err)=>{
      console.log(err.response);
    })
  }
  Card(x){
    return (
      <View style={styles.card}>
        <Image source ={{uri:x.image}} resizeMode="contain" style ={{width:350, height:350}} />
        <View style={{width:350, height:70,  alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between', margin:15, marginTop:25,}} >
          <Text style={{fontSize:20, fontWeight:'300', color:'white'}}>{x.first_name}, {x.last_name}</Text>
<Text style={{fontSize:21, fontWeight:'200', color:'white'}}> {x.title}</Text>
        </View>
        <View style={styles.container}>

        <Text style={{fontSize:12, fontWeight:'200', color:'white'}}>{x.body} </Text>
        </View>
        </View>

      </View>
    )
  }
    handleYup (card) {
    console.log(card)
    PostModel.postInterest(this.state.token,{item:card.id,interested:true}).then((res)=>{
      console.log(res);
      if(res.data.match){
        let match=res.data.match
        Alert.alert(
        `Hey you matched with ${match.user2.firstname} ${match.user2.lastname} `,
        `About item : ${match.item1.title}`,
        [
        {text: 'Message', onPress: () => this.props.navigation.navigate('Match')},
        {text:'keep playing'}
        ],
        { cancelable: false }
        )
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  handleNope (card) {
    console.log('heeere');
    console.log(card);
    PostModel.postInterest(this.state.token,{item:card.id,interested:false}).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })


  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Cards</Text>
      </View>
    )
  }

  yup(){
    card=this.refs['swiper'].state.card
    PostModel.postInterest(this.state.token,{item:card.id,interested:true}).then((res)=>{
        this.refs['swiper']._goToNextCard();
        if(res.data.match){
          let match=res.data.match
          Alert.alert(
          `Hey you matched with ${match.user2.firstname} ${match.user2.lastname} `,
          `About item : ${match.item1.title}`,
          [
          {text: 'Message', onPress: () => this.props.navigation.navigate('Match')},
          {text:'keep playing'}
          ],
          { cancelable: false }
          )
        }
    }).catch((err)=>{
      console.log(err);



    })
  }

nope(){
  card=this.refs['swiper'].state.card
  PostModel.postInterest(this.state.token,{item:card.id,interested:false}).then((res)=>{
    this.refs['swiper']._goToNextCard();
  }).catch((err)=>{
    console.log(err);
  })
}

  render() {

  !this.state.connected ? this.onLogin() : null;
    return (
      <View style={styles.container}>
      <SwipeCards
        ref = {'swiper'}
        cards={this.state.cards}
        containerStyle = {{  backgroundColor: '#303f9f', alignItems:'center', margin:20}}
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
    flex: 1
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
