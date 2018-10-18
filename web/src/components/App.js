import React, { Component } from 'react'

// views
import AuthView from './auth/view'

// AWS Amplify
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../../../aws-exports'
Amplify.configure(aws_exports)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedin: false,
      username: '',
    }

    // bind methods
    this.updateAppState = this.updateAppState.bind(this)
  }

  async componentWillMount() {
    // is user already logged in?
    await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ loggedin: true }))
      .catch(err => this.setState({ loggedin: false }))
  }

  updateAppState(obj) {
    for (key in obj) {
      // does key exist in state?
      if (Object.keys(this.state).indexOf(key) > -1) {
        this.setState({ [key]: obj[key] })
      }
    }
  }

  render() {
    return (
      this.state.loggedin
          ? null
          : <AuthView
              updateAppState={ this.updateAppState }
            />
    )
  }
}

export default App