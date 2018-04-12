import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import axios from 'axios';
import { NavigationActions } from 'react-navigation';
import SocketIOClient from 'socket.io-client';
import PostModel from '../model/Post';
import { Container, Header, Content, Input, Item,Text,Button } from 'native-base';

export default class Conversation extends Component {
  constructor(props){
  super(props);
  console.log(this.props.navigation.state);
  let data=  this.props.navigation.state.params;
  if(data){
  this.state={
    user:data.user,
    token:data.token,
    match:data.match,
    messages:[],
    message:''
  }
}
this.socket=SocketIOClient('https://salty-brushlands-90707.herokuapp.com/');
this.send=this.send.bind(this);
this.receive=this.receive.bind(this);
this.receive();
  }
  componentWillMount(){
    PostModel.matchMessages(this.state.token,this.state.match).then((res)=>{
      console.log(res);
      this.setState({
        messages:res.data.messages
      })
    }).catch((err)=>{
      console.log(err);
    })
  }
  send(){
    console.log('heere');
    this.socket.emit('message',{
      user:this.state.user,
      match:this.state.match,
      body:this.state.message
    });
  }
  receive(){
    console.log(this.state.match._id.toString());
    this.socket.on(this.state.match._id.toString(),(message)=>{
      console.log(message);
    })
  }
  render(){

    return (
      <View style={styles.container}>
      <View>
      </View>
      <View>
      <Container>
       <Content style={styles.row}>
         <Item regular >
           <Input placeholder='text here' style={styles.textInput}   onChangeText={(text) => this.setState({message:text})}/>

         </Item>
         <Button onPress={() => this.send() }>
          <Text> Click Me! </Text>
        </Button>
       </Content>
     </Container>
      </View>
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
    paddingHorizontal:16,
    fontSize:16,
    color:'black',
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
  },
  row:{
    flex:1,
    flexDirection:'row'

  }

});
