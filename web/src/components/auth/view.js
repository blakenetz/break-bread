import React, { Component } from 'react'

// views
import AuthForm from './form'
import AuthButtons from './buttons'

class AuthView extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: null, // 'signup', 'login', 'verify'
    }

    this.updateViewState = this.updateViewState.bind(this)
  }

  updateViewState(mode) {
    this.setState({ mode: mode })
  }

  render() {
    return (
      <section>
        <h1>break bread.</h1>

        { this.state.mode == null
          ? <AuthButtons handlePress={ this.updateViewState } />
          : <AuthForm
              mode={this.state.mode}
              updateViewState={ this.updateViewState }
            />
        }
      </section>
    )
  }
}

export default AuthView