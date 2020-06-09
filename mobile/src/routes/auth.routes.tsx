import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../constants/colors';

import Login from '../screens/Login';

const AppStack = createStackNavigator();

const AuthRoutes = ()=>{
  return (
    <NavigationContainer>
    <AppStack.Navigator headerMode="none" screenOptions={
      {
        cardStyle:{
          backgroundColor:colors.tintColor
        }
      }
    }>
      <AppStack.Screen name="Login" component={Login} />
    </AppStack.Navigator>
  </NavigationContainer>
  )
};


export default AuthRoutes;