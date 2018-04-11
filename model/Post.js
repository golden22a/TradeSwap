import axios from 'axios';
class PostModel{
  static allPost(token){
    let req = axios({
    method: 'GET',
    url: 'https://salty-brushlands-90707.herokuapp.com/api/posts',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':token
    }

     });
    return req;
  }
  static userPost(token){
    let req = axios({
    method: 'GET',
    url: 'https://calm-sierra-33982.herokuapp.com/api/user/posts',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':token
    }

     });
    return req;
  }

  static postPost(token,post){
    console.log(post);
    let req = axios({
    method: 'post',
    url: `https://salty-brushlands-90707.herokuapp.com/api/lool`,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'token':token
    },data:post


 });
    return req;
  }
  static deletePost(token,id){
    let req = axios({
    method: 'delete',
    url: `https://calm-sierra-33982.herokuapp.com/api/post/${id}`,
    headers:{
      'token':token
    }

 });
    return req;
  }
  static postUpdate(token,post,id){
    let req = axios({
    method: 'put',
    url: `https://calm-sierra-33982.herokuapp.com/api/post/${id}`,
    headers:{
      'token':token
    },data:{
      title:post.title,
      body:post.body,
      city:post.city
    }


 });
    return req;
  }

  static postInterest(token,post){
    console.log(post);
    let req = axios({
    method: 'post',
    url: `https://salty-brushlands-90707.herokuapp.com/api/interest`,
    headers:{
      'token':token
    },data:post


 });
    return req;
  }
  }




export default PostModel
