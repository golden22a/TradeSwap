import axios from 'axios';
export default class Connect {
static islogged(token){
  console.log(token);
  console.log('bbbbbb');
  let request = axios({
  method: 'GET',
  url: 'https://calm-sierra-33982.herokuapp.com/api/okay',
  headers:{
    'Content-Type': 'application/x-www-form-urlencoded',
    'token':token
  }

   });

  return request;

  }

}
