import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  view: {width: '100%', minHeight: '100%', flex: 1},
  imageBackground: {
    width: '100%',
    minHeight: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  message: {textAlign: 'center'},
  button: {margin: 10},
  buttonText: {color: 'black'},
});

const buttons = [
  {label: 'Log in!', route: 'Login'},
  {label: 'Sign up!', route: 'Signup'},
];

export default function WelcomeView(props) {
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <View style={styles.view}>
      <ImageBackground
        source={require('../../assets/images/blue-pineapple.png')}
        style={styles.imageBackground}>
        <Text style={styles.title}>Break Bread.</Text>

        {/* {Boolean(message) && <Text style={styles.message}>{message}</Text>} */}

        {buttons.map(btn => (
          <Button
            key={btn.route}
            onPress={() => props.navigation.navigate(btn.route)}
            style={styles.button}>
            {textProps => (
              <Text {...textProps} style={[textProps.style, styles.buttonText]}>
                {btn.label}
              </Text>
            )}
          </Button>
        ))}
      </ImageBackground>
    </View>
  );
}
