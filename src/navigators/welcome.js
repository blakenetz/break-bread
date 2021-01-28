import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Landing from '../components/welcome/landing';
import Signup from '../components/welcome/signup';
import Login from '../components/welcome/login';

const Stack = createStackNavigator();

export default function WelcomeStack() {
  return (
    <>
      <Stack.Navigator initialRouteName="Landing" headerMode="none">
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
}
