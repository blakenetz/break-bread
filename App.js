import React, { Component } from 'react'
import { View } from 'react-native'

import AuthView from './components/auth/view'
import Main from './components/main'

// AWS Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signedup: false,
      verified: false,
      loggedin: false,
    }
  }

  async componentWillMount() {
    // is user already logged in?
    await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ loggedin: true }))
      .catch(err => this.setState({ loggedin: false }))
  }

  render() {
    return (
      this.state.loggedin
        ? <Main />
        : <AuthView
            signedup={ this.state.signedup }
            verified={ this.state.verified }
          />
    )
  }
}