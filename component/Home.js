import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  TextInput
} from 'react-native';
import axios from 'axios';
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      firstname:'',
      lastname:'',
      message:'',
      error:{}
    }
    this.onPressButton=this.onPressButton.bind(this);

  }
  onPressButton(){
    console.log(this.state);
  axios.post('https://salty-brushlands-90707.herokuapp.com/auth/signup',this.state).then((res)=>{
    console.log(res);
    AsyncStorage.setItem('token',res.data.token);
    this.props.navigation.navigate('MainScreen',{user:res.data});

  }).catch((err)=>{
    console.log(err.response.data);
    this.setState({
      error:err.response.data.errors || {email:'email already exists'},
      message:err.response.data.message
    })
  });
  }
  render(){

    return (
      <View style={styles.container}>


    <TextInput
    style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
     onChangeText={(text) => {
       let error=this.state.error;
       error.firstname=''
       this.setState({firstname:text ,error:error,message:''})
     }}
    placeholder={'firstname'}
  />
  <Text style={{color:'red'}}>{this.state.error.firstname}</Text>
  <TextInput
  style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
   onChangeText={(text) =>
     {
       let error=this.state.error;
       error.lastname=''
     this.setState({lastname:text,error:error,message:''})
   }}
  placeholder={'lastname'}
/>
<Text style={{color:'red'}}>{this.state.error.lastname}</Text>

<TextInput
  autoCapitalize='none'
style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
onChangeText={(text) => {
  let error=this.state.error;
  error.email=''
  this.setState({email:text,error:error,message:''})
}}
placeholder={'Email'}
/>
<Text style={{color:'red'}}>{this.state.error.email}</Text>

<TextInput
  autoCapitalize='none'
style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
secureTextEntry={true} onChangeText={(text) => {
  let error=this.state.error;
  error.password=''
  this.setState({password:text,error:error,message:''})
}}
placeholder={'passowrd'}
/>
<Text style={{color:'red'}}>{this.state.error.password}</Text>

    <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
      <Text style={styles.buttonText} >SignUp </Text>
    </TouchableOpacity>
    <Text style={{color:'red'}}>{this.state.message}</Text>

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
  }

});
