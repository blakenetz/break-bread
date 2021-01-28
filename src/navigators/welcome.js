import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Landing from '../components/welcome/landing';

const Stack = createStackNavigator();

export default function WelcomeStack() {
  return (
    <Stack.Navigator initialRouteName="Landing" headerMode="none">
      <Stack.Screen name="Landing" component={Landing} />
    </Stack.Navigator>
  );
}
