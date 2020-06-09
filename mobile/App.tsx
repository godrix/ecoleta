import React, {useEffect} from 'react';
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'
import * as SplashScreen from 'expo-splash-screen';
import Routes from './src/routes';
import {AuthProvider} from './src/contexts/auth'; 
import {useAuth} from './src/hooks/useAuth'; 

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  const {loading} = useAuth();

  useEffect(()=>{
    (async ()=>{
      await SplashScreen.preventAutoHideAsync();

      if(fontsLoaded && !loading){
        await SplashScreen.hideAsync();
      }
    })();

   
  },[fontsLoaded])

  if(!fontsLoaded){
    return <></>
  }
 
  return (
  <AuthProvider>
    <Routes/>
  </AuthProvider>
  )
  
}