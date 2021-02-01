import React, {
  createRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {StatusBar, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';

import Input from './input';

const schema = [
  {
    name: 'email',
    textContentType: 'emailAddress',
    keyboardType: 'email-address',
    enablesReturnKeyAutomatically: true,
  },
  {
    name: 'password',
    accessoryRight: 'password',
    enablesReturnKeyAutomatically: true,
  },
];

const styles = StyleSheet.create({
  main: {paddingVertical: 32, paddingHorizontal: 16},
  title: {marginBottom: 32},
  link: {textDecorationLine: 'underline'},
  text: {marginTop: 32},
});

function reducer(state, action) {
  const {field, value} = action;
  return {
    ...state,
    [field]: value,
  };
}

export default function Login(props) {
  const [refs, setRefs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setRefs(prev => {
      return Array(schema.length)
        .fill()
        .map((_, i) => prev[i] || createRef());
    });
  }, [setRefs]);

  const [values, dispatch] = useReducer(
    reducer,
    schema.reduce((acc, {name}) => ({...acc, [name]: ''}), {}),
  );

  const handleSubmit = useCallback(() => {
    if (errors.length) return;
    Auth.signIn(values.username, values.password)
      .then(data => {
        console.debug('signIn success!', data);
      })
      .catch(err => {
        console.debug('error at login', err);
        props.navigation.navigate('Landing', {error: true});
      });
  }, [values, errors]);

  const handleBlur = useCallback(
    input => {
      setErrors(prev => {
        if (!values[input.name].length)
          return prev.filter(err => err !== input.name);
      });
    },
    [values, setErrors],
  );

  const handleFocus = useCallback(
    input => {
      setErrors(prev => prev.filter(err => err !== input.name));
    },
    [setErrors],
  );

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />

      <Text category="h1" style={styles.title}>
        Login!
      </Text>

      {schema.map((input, i) => (
        <Input
          key={input.name}
          ref={refs[i]}
          input={input}
          value={values[input.name]}
          handleSubmitEditing={() => {
            if (i === schema.length - 1) handleSubmit();
            else refs[i + 1].current.focus();
          }}
          handleChange={val => dispatch({field: input.name, value: val})}
          handleFocus={() => handleFocus(input)}
          handleBlur={() => handleBlur(input)}
          autoFocus={i === 0}
          returnKeyType={i === schema.length - 1 ? 'done' : 'next'}
          hasError={errors.includes(input.name)}
        />
      ))}

      <Text style={styles.text}>
        Don't have an account?{' '}
        <TouchableWithoutFeedback
          accessibilityLabel="sign up"
          onPress={() => props.navigation.navigate('Signup')}>
          <Text status="info" style={styles.link}>
            Sign up
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </SafeAreaView>
  );
}
