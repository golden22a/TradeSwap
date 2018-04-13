import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  AsyncStorage,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import axios from 'axios';
import connect from '../auth/auth';
import PostModel from '../model/Post';


export default class MAtch extends Component {
  constructor(props){
    super(props);
    this.state={
      connected:false,
      token:'',
      user:'',
      matches:[]
    }
    this.all=this.all.bind(this);
    console.log(this.state);
  }
  componentWillMount(){
    AsyncStorage.getItem('token').then((val)=>{
      console.log(val);
      connect.islogged(val).then((response)=>{
        this.setState({
          connected:true,
          token:val,
          user:response.data.user
        });
        console.log(this.state);

        this.all(val);
      }).catch((error) =>{
        console.log('no');
        console.log(error);
        AsyncStorage.removeItem('token');


      });
  }).catch((error)=>{
    console.log('no no')

    AsyncStorage.removeItem('token');


  });
}
all(token){
  console.log('okay1');
  PostModel.matches(token).then((res)=>{
    console.log(res.data.matches);
    this.setState({
      matches:res.data.matches
    })
  }).catch((err)=>{
    console.log(err.response);
  })
}
  render(){
    let card=this.state.matches.map((match)=>{
    return  (

        <Card  key={match._id}>
        <CardItem style={{margin:10}}   button onPress={() => this.props.navigation.navigate('Conversation',{token:this.state.token,user:this.state.user,match:match})}>
          <Body>
            <Text>
            {match.title}
           </Text>
          </Body>
             </CardItem>
             </Card>

     )
    })
    return (
      <View style={styles.container}>
      <Container >
      <Content >


         {card}


         </Content>
     </Container>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor:"#0d47a1"
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
