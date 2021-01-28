import React from 'react';
import {Text, Layout} from '@ui-kitten/components';

const schema = [
  {
    name: 'username',
    autoCapitalize: 'sentences',
  },
  {
    name: 'password',
    accessoryRight: 'password',
  },
];

export default function Login() {
  return (
    <Layout>
      <Text>LOGIN!</Text>
    </Layout>
  );
}
