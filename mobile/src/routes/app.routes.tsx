import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../constants/colors';

import Points from '../screens/Points';
import Detail from '../screens/Detail';
import AddPoint from '../screens/AddPoint';

const AppStack = createStackNavigator();

const AppRoutes = ()=>{
  return (
    <NavigationContainer>
    <AppStack.Navigator headerMode="none" screenOptions={
      {
        cardStyle:{
          backgroundColor:colors.tintColor
        }
      }
    }>
      <AppStack.Screen name="Points" component={Points} />
      <AppStack.Screen name="AddPoint" component={AddPoint}/>
      <AppStack.Screen name="Detail" component={Detail} />
    </AppStack.Navigator>
  </NavigationContainer>
  )
};


export default AppRoutes;