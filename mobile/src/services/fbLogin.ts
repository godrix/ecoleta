import * as Facebook from 'expo-facebook';
import app from '../constants/app';
import axios from 'axios';

interface FbLoginReturn {
  name:string;
  email:string;
  id:string;
  url:string;
}


export  function FBlogin():Promise<FbLoginReturn>{
    return new Promise((resolve)=>{
      Facebook.initializeAsync(app.fabebookId).then((fb)=>{
        Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        }).then((login)=>{
          if(login.type === 'success'){
            axios.get(
              `https://graph.facebook.com/me?access_token=${login.token}&fields=id,email,name,picture{url}`,
            ).then((response)=>{
              const { email, id, name } = response.data;
              const { url } = response.data.picture.data;
              resolve({name, email, id, url});
            })
          }
        })
      })
    });
}