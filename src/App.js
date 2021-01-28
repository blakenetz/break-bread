import 'react-native-gesture-handler';
import React from 'react';
import Auth from '@aws-amplify/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

import aws_exports from './aws-exports';
import WelcomeStack from './navigators/welcome';
import RootView from './components/root/view';
import {default as theme} from './assets/theme.json';
import {default as mapping} from './assets/mapping.json';

Auth.configure(aws_exports);
enableScreens();

const Stack = createStackNavigator();

// primary: '#62fcbe',
// blue: '#43A8B1',
// red: '#FF443A',

function NavigationUI(props) {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeStack} />
      <Stack.Screen name="Root" component={RootView} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{...eva.light, ...theme}}
          customMapping={mapping}>
          <NavigationContainer>
            <NavigationUI />
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaProvider>
    </>
  );
}
