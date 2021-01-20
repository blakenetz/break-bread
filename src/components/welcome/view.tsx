import React, {useState} from 'react';
import {ImageBackground, Text, StyleSheet, Pressable} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Form from './form';
import {CustomTheme} from '../../App';

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'traveling-typewriter',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  message: {textAlign: 'center'},
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
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
          <Pressable
            key={btn.key}
            onPress={() => setMode(btn.key)}
            style={[styles.button, {backgroundColor: theme.colors.primary}]}>
            <Text>{btn.label}</Text>
          </Pressable>
        ))
      ) : (
        <Form mode={mode} onSubmit={setMode} setMessage={setMessage} />
      )}
    </ImageBackground>
  );
}
