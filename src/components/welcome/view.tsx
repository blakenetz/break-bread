import React, {useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Button, Text} from '@ui-kitten/components';

import Form from './form';

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

const initialMode = 'initial';

const buttons = [
  {label: 'Log in!', key: 'login'},
  {label: 'Sign up!', key: 'signup'},
];

export default function WelcomeView() {
  const theme = useTheme();

  const [message, setMessage] = useState();
  const [mode, setMode] = useState(initialMode);

  return (
    <ImageBackground
      source={require('../../assets/images/blue-pineapple.png')}
      style={styles.imageBackground}>
      <Text style={styles.title}>Break Bread.</Text>

      {Boolean(message) && <Text style={styles.message}>{message}</Text>}

      {mode === initialMode ? (
        buttons.map((btn) => (
          <Button
            key={btn.key}
            onPress={() => setMode(btn.key)}
            style={styles.button}>
            {(textProps) => (
              <Text
                {...textProps}
                style={[textProps?.style, styles.buttonText]}>
                {btn.label}
              </Text>
            )}
          </Button>
        ))
      ) : (
        <Form mode={mode} onSubmit={setMode} setMessage={setMessage} />
      )}
    </ImageBackground>
  );
}
