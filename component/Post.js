import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
export default class Post extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:'',
      images:''
    }
  }
  render(){

    return (
      <View style={styles.container}>
      <View style={styles.Top}>
      <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
        <Text style={styles.buttonText} >Take a picture </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
        <Text style={styles.buttonText} >Chose from gallert </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.Buttom}>
      <TextInput
      style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
      onChangeText={(text) => this.setState({title:text})}
      placeholder={'Title'}
    />
    <TextInput
    style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
    multiline = {true}
    numberOfLines = {10}
    onChangeText={(text) => this.setState({body:text})}
    placeholder={'Body'}
  />
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
    backgroundColor:'#001970',
    borderRadius:25,
  },
  buttonText:{
    textAlign:'center',
    color:'#ffffff',
    fontSize:16
  },
  Top:{
    flex:1,
    paddingTop:100,
    justifyContent: 'center',
    alignItems: 'center'

  },
  Buttom:{
    flex:3
  }

});
