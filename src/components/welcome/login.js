import React, {useCallback} from 'react';
import Auth from '@aws-amplify/auth';

import Form from './form';

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

export default function Login(props) {
  const {navigation} = props;

  const handleSubmit = useCallback(
    values => {
      Auth.signIn(values.username, values.password)
        .then(data => {
          console.debug('signIn success!', data);
        })
        .catch(err => {
          console.debug('error at login', err);
          navigation.navigate('Landing', {error: true});
        });
    },
    [navigation],
  );

  return (
    <Form
      title="Login!"
      submitButtonText="Yule log... in"
      schema={schema}
      link={{
        text: "Don't have an account?",
        cta: 'Sign up',
        onPress: () => props.navigation.navigate('Signup'),
      }}
      submit={handleSubmit}
      navigate={props.navigation.navigate}
    />
  );
}
