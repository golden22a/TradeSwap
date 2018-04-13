import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  AsyncStorage,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import axios from 'axios';
import connect from '../auth/auth';
import PostModel from '../model/Post';
export default class LikedMe extends Component {
  constructor(props){
    super(props);
    this.state={
      token:'',
      cards:[]
    }
    this.all=this.all.bind(this);
  }
  componentWillMount(){
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

    });

  }).catch((error) => {
    console.log(error);
  });
  }
  all(token){
    PostModel.LikedMe(token).then((res)=>{
      this.setState({
        cards:res.data.interests
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
  render(){
    let liked=this.state.cards.map((card)=>{
      return(


        <Content key={card._id}>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Body>
                <Text>{card.user.firstname} {card.user.lastname}</Text>
                  <Text>{card.item.title}</Text>
                  <Text note>{card.item.day_created}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: card.item.images[0]  }} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                {card.item.body}
                  </Text>
              </Body>
            </CardItem>

          </Card>
        </Content>


      )
    })
    return (
      <View style={styles.container}>
          <Container >
      {liked}
      </Container>
      </View>
    )
  }
  }
  const styles = StyleSheet.create({
  container: {
    flex: 1,
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
