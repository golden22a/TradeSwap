import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AsyncStorage,
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PostModel from '../model/Post';
import axios from 'axios';
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  noData:true,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export default class Post extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:'',
      images:[],
      error:'',
      success:'',
      token:''
    }
    this.send=this.send.bind(this);
    this.hundleGallery=this.hundleGallery.bind(this);
    this.hundleCamera=this.hundleCamera.bind(this);
    this.getToken=this.getToken.bind(this);
  }
  componentWillMount(){
    console.log('iam calling insode cinfig');
    this.getToken();

  }
  getToken(){
    console.log('waaaa');
    AsyncStorage.getItem('token').then((val)=>{
      console.log('token');
      console.log(val);
        this.setState({
          token:val
        });
        console.log(this.state);



      }).catch((error)=>{

        AsyncStorage.removeItem('token');


      });
      console.log(this.state)
  }
  hundleGallery(){
    console.log('loool');
    ImagePicker.openPicker({
      multiple: true,
      width:300,
      height:300,
      corp:true,
      mediaType:'photo'
            }).then(images => {

    this.setState({
      images:images
    });
    console.log(this.state);






 }).catch((err)=>{
   console.log(err);
 });
  }
  hundleCamera(){
    ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true
      }).then(image => {
      this.setState({
        images:image
      });
    });
  }
  send(){
    console.log(this.state);
    const formData = new FormData();

this.state.images.forEach((image)=>{
  let file = {
    uri: image.path,
    type:  image.mime,
    name: 'myImage' + '-' + Date.now() + '.jpg',
    size:  image.size
  }
     formData.append('myImage', file);
})
formData.append('title',this.state.title);
formData.append('body',this.state.body);

  PostModel.postPost(this.state.token,formData).then((res)=>{
      Alert.alert(
  'Post',
  'Item Posted great',
  [
    {text: 'OK', onPress: () => this.props.navigation.navigate('Main')},
  ],
  { cancelable: false }
)
  this.setState({
    images:[],
    text:'',
    body:''
  })
  console.log(res);
    }).catch((err)=>{
      Alert.alert(
  'Oh',
  'error item not created you need to specify an image',
  [
    {text: 'OK'},
  ],
  { cancelable: false }
  )
    });
  }
  render(){
  let images =  this.state.images.map((image,val)=>{
    return (  <Image key={val}
          style={{width: 100, height: 100}}
          source={{uri: image.path}}
        />)
    })
    return (

      <View style={styles.container}>
      <View style={styles.Top}>
      <TouchableOpacity style={styles.button} onPress={this.hundleCamera}>
        <Text style={styles.buttonText} >Take a picture </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={this.hundleGallery}>
        <Text style={styles.buttonText} >Chose from gallery </Text>
      </TouchableOpacity>
      <View style={styles.row}>
      {images}
      </View>
      </View>
      <View style={styles.Buttom}>
      <TextInput
      style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
      onChangeText={(text) => this.setState({title:text})}
      placeholder={'Title'}     />
    <TextInput
    style={styles.textInput} underlineColorAndroid='rgba(0,0,0,0)'
    multiline = {true}
    numberOfLines = {10}
    onChangeText={(text) => this.setState({body:text})}
    placeholder={'Body'}
  />
  <TouchableOpacity style={styles.button} onPress={this.send}>
    <Text style={styles.buttonText} >Send </Text>
  </TouchableOpacity>
    <Text  >{this.state.success}</Text>
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
    flex:3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'space-between'
  }

});
