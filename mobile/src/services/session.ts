import api from './api';
import {FBlogin} from './fbLogin';
import {Platform} from 'react-native'

interface AuthSession {
  name:string;
  email:string;
  id:string;
  url:string;
}

interface UserResponse {
  user: {
    name: string;
    email: string;
  },
  token: string;
}

export default async function authSession():Promise<UserResponse>{

  if(Platform.OS === 'ios'){
    const login = await api.post('sessions',{
      name: 'Iphone Teste',
      email: 'user@email.com',
      facebookId:'12345678',
      userPicture:'1234567'
    });

    return login.data;
  }

  const response = await FBlogin();

  const login = await api.post('sessions',{
        name: response.name,
        email:response.email,
        facebookId:response.id,
        userPicture:response.url
      });

  return login.data;
     

}