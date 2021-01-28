import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Button, Text} from '@ui-kitten/components';

import Form, {modes} from './form';

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
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
  {label: 'Log in!', mode: modes.login},
  {label: 'Sign up!', mode: modes.signup},
];

export default function WelcomeView() {
  const [message, setMessage] = useState();
  const [mode, setMode] = useState(modes.initial);

  return (
    <ImageBackground
      source={require('../../assets/images/blue-pineapple.png')}
      style={styles.imageBackground}>
      <Text style={styles.title}>Break Bread.</Text>

      {Boolean(message) && <Text style={styles.message}>{message}</Text>}

      {mode === modes.initial ? (
        buttons.map(btn => (
          <Button
            key={btn.mode}
            onPress={() => setMode(btn.mode)}
            style={styles.button}>
            {textProps => (
              <Text {...textProps} style={[textProps.style, styles.buttonText]}>
                {btn.label}
              </Text>
            )}
          </Button>
        ))
      ) : (
        <Form mode={mode} changeView={setMode} setMessage={setMessage} />
      )}
    </ImageBackground>
  );
}
