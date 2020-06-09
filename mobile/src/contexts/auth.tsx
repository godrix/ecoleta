import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';
import sessionLogin from '../services/session';

interface AuthContextData {
  signed:boolean;
  user:User | null;
  login():Promise<void>;
  logout():void;
  loading:boolean;
}

interface User{
  name:string;
  email:string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider:React.FC = ({children})=> {
  const [user, setUser]  = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async()=>{

       const storageUser = await AsyncStorage.getItem("@Ecoleta:user");
       const storageToken = await AsyncStorage.getItem("@Ecoleta:token");

      if(storageUser && storageToken){
        setUser(JSON.parse(storageUser));
        api.defaults.headers['Authorization'] = `Bearer ${storageToken}`;
      }
      setLoading(false);
    })()
  },[])

  async function login(){
    const response = await sessionLogin();
    setUser(response.user);

    await AsyncStorage.setItem('@Ecoleta:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@Ecoleta:token', response.token);

    api.defaults.headers['Authorization'] = `Bearer ${response.token}`;
  }

  function logout(){
    Alert.alert(
      "Já vai embora?",
      "Tem certeza que gostaria de sair?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sair", onPress: () => {
          setUser(null);
          AsyncStorage.clear().then(()=>{
          console.info('cleaned up: ♺')
          });
        } 
      }
      ],
      { cancelable: false }
    );
    
  }


  return (
    <AuthContext.Provider value={{
      signed:!!user,
      user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;