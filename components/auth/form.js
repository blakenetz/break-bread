import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'

import styles from '../../assets/styles'
import AuthInput from './inputs'

export default class AuthForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      phone: '',
      errors: [],
    }

    // event handlers
    this.handleChange = this.handleChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(obj) {
    for (key in obj) {
      this.setState({ [key]: obj[key] })
    }
  }

  validateInput(obj) {
    for (key in obj) {
      const i = this.state.errors.indexOf(key)
      const length = obj[key].trim().length

      if ((key == 'username' && length == 0)
        || (key == 'password' && length < 7)
        || (key == 'phone' && length != 10)
      ){
        // add to errors
        if (i == -1) {
          this.setState( prevState => {
            return { errors: [...prevState.errors, key] }
          })
        }
      }
      else {
        // remove from errors
        if (i > -1) {
          this.setState( prevState => {
            return { errors: prevState.errors.filter(error => error !== key) }
          })
        }
      }
    }
  }

  handleSubmit() {
    console.log('submit')
  }

  render() {
    return (
      <Fragment>

        <AuthInput
          name='username'
          label='Username'
          value={ this.state.username }
          handleChange={ this.handleChange }
          handleBlur={ this.validateInput }
          returnKey='next'
          keyboard='default'
          textContent='username'
          placeholder='Make it fun!'
          autoFocus={ true }
          autoCapitalize='sentences'
          hasError={ this.state.errors.indexOf('username') > -1 }
          errorMessage='Please add a name. We need to call you something.'
        />

        <AuthInput
          name='password'
          label='Password'
          value={ this.state.password }
          handleChange={ this.handleChange }
          handleBlur={ this.validateInput }
          returnKey='next'
          keyboard='default'
          textContent='password'
          placeholder='Make it difficult!'
          autoFocus={ false }
          autoCapitalize='none'
          hasError={ this.state.errors.indexOf('password') > -1 }
          errorMessage='Password needs to be at least 7 characters.'
        />

        <AuthInput
          name='phone'
          label='Phone Number'
          value={ this.state.phone }
          handleChange={ this.handleChange }
          handleBlur={ this.validateInput }
          returnKey='done'
          keyboard='phone-pad'
          textContent='telephoneNumber'
          placeholder='To verify that you are in fact you...'
          autoFocus={ false }
          autoCapitalize='none'
          hasError={ this.state.errors.indexOf('phone') > -1 }
          errorMessage="That's not a number! 10 characters please."
        />

        <TouchableOpacity
          onPress={ this.handleSubmit }
          style={ styles.button }
        >
          <Text>Submit!</Text>
        </TouchableOpacity>

      </Fragment>
    )
  }
}