import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
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
    Keyboard.dismiss();

  }
  receive(){
    console.log(this.state.match._id.toString());
    this.socket.on(this.state.match._id.toString(),(message)=>{
      console.log(message);
      let messages=this.state.messages;
      messages.push(message)
      this.setState({
        messages:messages,
        message:''
      })
      console.log(this.state);

    })
  }
  render(){
    let messages=this.state.messages.slice(-20).map((message)=>{
      let layout={fontSize: 20,
    fontWeight: 'bold',
  color:'green',
  textAlign:'left'}
      if(message.user.toString() == this.state.user._id.toString())
      layout={fontSize: 20,
    fontWeight: 'bold',
  color:'blue',
  textAlign:'right'}
      return (<Text key={message._id} style={layout} >{message.body}</Text>)
    })
    return (
      <View style={styles.container} >
      <View style={styles.messages}>
      <ScrollView contentContainerStyle={{flex:1}}>
      {messages}
      </ScrollView>
      </View>
      <View style={styles.row}>
      <Container style={styles.okay}>
       <Content >
         <Item regular >
           <Input placeholder='text here' style={styles.textInput}  value={this.state.message}  onChangeText={(text) => this.setState({message:text})}/>

         </Item>

       </Content>

     </Container>
     <Button style={styles.button} onPress={() => this.send() }>
      <Text> Click Me! </Text>
    </Button>
      </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInput:{
    backgroundColor:'rgba(255, 255,255,0.2)',
    color:'black'


  },
  okay:{
      flex:3
  },
  button:{
  flex:1


  },
  buttonText:{
    textAlign:'center',
    color:'#ffffff',
    fontSize:16
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',




  },
  messages:{
    flex:9
  }

});
