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

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const schema = [
  {
    name: 'name',
    errorMessage: 'Everyone needs a name',
    validate: val => emailRegex.test(val),
    autoCapitalize: 'words',
    enablesReturnKeyAutomatically: true,
  },
  {
    name: 'email',
    errorMessage: "C'mon man, add your email",
    validate: val => val.length > 0,
    textContentType: 'emailAddress',
    keyboardType: 'email-address',
    enablesReturnKeyAutomatically: true,
  },
  {
    name: 'password',
    errorMessage: 'Password needs to be at least 7 characters',
    validate: val => val.length > 7,
    passwordRules: 'minlength: 7',
    textContentType: 'newPassword',
    placeholder: 'Make it difficult',
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

    Auth.signUp({
      username: values.username,
      password: values.password,
      attributes: {
        name: values.username,
        ...(values.phone ? {phone_number: `+1${values.phone}`} : null), // E.164 number convention
        ...(values.email ? {email: values.email} : null),
      },
    })
      .then(data => {
        console.log({data});
      })
      .catch(err => {
        console.debug('error at sign up', err);
        props.navigation.navigate('Landing', {error: true});
      });
  }, [values, errors]);

  const handleBlur = useCallback(
    input => {
      const {validate} = schema.find(({name}) => name === input.name);
      setErrors(prev => {
        return !validate(values[input.name]) ? prev.concat(input.name) : prev;
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
        Sign up!
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
        Already have an account?{' '}
        <TouchableWithoutFeedback
          accessibilityLabel="sign up"
          onPress={() => props.navigation.navigate('Login')}>
          <Text status="info" style={styles.link}>
            Login
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </SafeAreaView>
  );
}
