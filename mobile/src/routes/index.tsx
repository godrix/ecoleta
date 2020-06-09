import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../constants/colors';

import AuthContext from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const AppStack = createStackNavigator();

const Routes = ()=>{

  const {signed} = useContext(AuthContext);
  return signed ? <AppRoutes/> : <AuthRoutes/>
  
};


export default Routes;