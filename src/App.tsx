import 'react-native-gesture-handler';
import React from 'react';
import Auth from '@aws-amplify/auth';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import aws_exports from './aws-exports';
import WelcomeView from './components/welcome/view';
import RootView from './components/root/view';

export interface CustomTheme extends Theme {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    // additional
    blue: string;
    red: string;
  };
}

Auth.configure(aws_exports);

const Stack = createStackNavigator();
const theme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#62fcbe',
    blue: '#43A8B1',
    red: '#FF443A',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Welcome" headerMode="none">
        <Stack.Screen name="Welcome" component={WelcomeView} />
        <Stack.Screen name="Root" component={RootView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
