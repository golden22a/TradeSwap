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
export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      res:'',
      error:{},
      message:'',
      connected:false
    }
    this.onPressButton=this.onPressButton.bind(this);
    this.test=this.test.bind(this)

  }
  onPressButton(){
    console.log(this.state);
  axios.post('https://salty-brushlands-90707.herokuapp.com/auth/login',this.state).then((res)=>{
    console.log(res);

const hey=  AsyncStorage.setItem('token',res.data.token);
console.log(hey);
  this.setState({
    res:res.data,
    connected:true
  })
  console.log(this.state);
  this.props.navigation.navigate('MainScreen',{user:res.data});
  }).catch((err)=>{
    console.log(err.response.data);
    this.setState({
      error:err.response.data.errors || {email:'email already exists'},
      message:err.response.data.message
    })
  });
  }
  test(){

  }
  render(){

    return (
      <View style={styles.container}>

        <TextInput
        style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
        onChangeText={(text) => {
          let error=this.state.error;
          error.email=''
          this.setState({email:text,message:'',error:error})
      }}
        placeholder={'Email'}
      />
      <Text style={{color:'red'}}>{this.state.error.email}</Text>

      <TextInput
      style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
      secureTextEntry={true} onChangeText={(text) =>{
        let error=this.state.error;
        error.password=''
        this.setState({password:text,message:'',error:error})
    }}
      placeholder={'passowrd'}
    />
    <Text style={{color:'red'}}>{this.state.error.password}</Text>

    <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
      <Text style={styles.buttonText} >Login </Text>
    </TouchableOpacity>
    <Text>
    dont have an accont ? <Text style={styles.link} onPress={()=>
      this.props.navigation.navigate('HomeScreen',{test:this.test})
      }> Sign up</Text>
    </Text>
    <Text style={{color:'red'}}> {this.state.message}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:"#0d47a1",
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
  },
  link:{
    color:"white"
  }

});
