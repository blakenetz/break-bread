import 'react-native-gesture-handler';
import React from 'react';
import Auth from '@aws-amplify/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import aws_exports from './aws-exports';
import AuthView from './components/auth/view';
import HomeView from './components/main/view';

Auth.configure(aws_exports);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthView} />
        <Stack.Screen name="Home" component={HomeView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
