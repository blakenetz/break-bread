import React, {useCallback} from 'react';
import Auth from '@aws-amplify/auth';

import Form from './form';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const schema = [
  {
    name: 'name',
    errorMessage: 'Everyone needs a name',
    validate: val => val.length > 0,
    autoCapitalize: 'words',
    enablesReturnKeyAutomatically: true,
  },
  {
    name: 'email',
    errorMessage: "C'mon man, add your email",
    validate: val => emailRegex.test(val),
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
    placeholder: "Probably your dog's name...",
    accessoryRight: 'password',
    enablesReturnKeyAutomatically: true,
  },
];

export default function Login(props) {
  const {navigation} = props;

  const handleSubmit = useCallback(
    values => {
      Auth.signUp({
        email: values.email,
        password: values.password,
        attributes: {name: values.name},
      })
        .then(data => {
          console.log({data});
        })
        .catch(err => {
          console.debug('error at sign up', err);
          navigation.navigate('Landing', {error: true});
        });
    },
    [navigation],
  );

  return (
    <Form
      title="Sign up!"
      submitButtonText="Sign up, buttercup"
      schema={schema}
      link={{
        text: 'Already have an account?',
        cta: 'Login',
        onPress: () => props.navigation.navigate('Login'),
      }}
      submit={handleSubmit}
      navigate={props.navigation.navigate}
    />
  );
}
