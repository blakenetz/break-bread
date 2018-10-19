import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Auth from '@aws-amplify/auth'

import styles from '../../assets/styles'
import AuthInput from './inputs'

export default class AuthForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      phone: '',
      verificationCode: '',
      errors: [],
    }

    // event handlers
    this.handleChange = this.handleChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)

    // inputs
    this.inputs = []
    const username = {
      name: 'username',
      label: 'Username',
      value: this.state.username,
      handleChange: this.handleChange,
      handleBlur: this.validateInput,
      returnKey: 'next',
      keyboard: 'default',
      textContent: 'username',
      placeholder: 'Make it fun!',
      autoFocus: true,
      autoCapitalize: 'sentences',
      errorMessage: 'Please add a name. We need to call you something.',
    }
    const password = {
      name: 'password',
      label: 'Password',
      value: this.state.password,
      handleChange: this.handleChange,
      handleBlur: this.validateInput,
      returnKey: 'next',
      keyboard: 'default',
      textContent: 'password',
      placeholder: 'Make it difficult!',
      autoFocus: false,
      autoCapitalize: 'none',
      errorMessage: 'Password needs to be at least 7 characters.',
    }
    const phone = {
      name: 'phone',
      label: 'Phone Number',
      value: this.state.phone,
      handleChange: this.handleChange,
      handleBlur: this.validateInput,
      returnKey: 'done',
      keyboard: 'phone-pad',
      textContent: 'telephoneNumber',
      placeholder: 'To verify that you are in fact you...',
      autoFocus: false,
      autoCapitalize: 'none',
      errorMessage: "That's not a number! 10 characters please.",
    }

    const verify = {
      name: 'verify',
      label: 'Verification Code',
      value: this.state.verificationCode,
      handleChange: this.handleChange,
      handleBlur: this.validateInput,
      returnKey: 'done',
      keyboard: 'default',
      textContent: 'none',
      placeholder: 'Expect a text message.',
      autoFocus: true,
      autoCapitalize: 'none',
      hasError: false,
      errorMessage: null,
    }

    switch (this.props.mode) {
      case ('signup'):
        this.inputs = [username, password, phone]; break;
      case ('login'):
        this.inputs = [username, password]; break;
      case ('verify'):
        this.inputs = [verify]; break;
    }
  }

  handleError(err) {
    console.error('crap an error: ', err)
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
        || (key == 'password' && length < 8)
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

  async handleSubmit() {
    // ERROR CHECK
    if (this.state.errors.length > 0) return;

    // SIGN UP
    if (this.props.mode == 'signup') {
      await Auth.signUp({
        username: this.state.username,
        password: this.state.password,
        attributes: {
          phone_number: `+1${this.state.phone}`, // E.164 number convention
        },
      })
        .then(data => {
          console.log('signup success!', data)
          if (data.user) {
            this.props.updateFormState({
              mode: 'verify',
              username: this.state.username,
            })
          }

        })
        .catch(err => {
          this.handleError(err)
          // user already exists
          this.props.updateFormState({
            mode: 'login',
            message: err.code,
          })
        })
    }

    // LOGIN
    else {
      await Auth.signIn(this.state.username, this.state.password)
        .then(data => {
          console.log('signin success!', data)
          this.props.updateFormState({
            loggedin: true,
            username: this.state.username,
          })
        })
        .catch(err => this.handleError(err))
    }
  }

  render() {
    return (
      <Fragment>
        { this.inputs.map((input, i) => {
          return (
            <AuthInput
              name={ input.name }
              label={ input.label }
              value={ input.value }
              handleChange={ input.handleChange }
              handleBlur={ input.handleBlur }
              returnKey={ input.returnKey }
              keyboard={ input.keyboard }
              textContent={ input.textContent }
              placeholder={ input.placeholder }
              autoFocus={ input.autoFocus }
              autoCapitalize={ input.autoCapitalize }
              hasError={ input.hasError || (this.state.errors.indexOf(input.name) > -1) }
              errorMessage={ input.errorMessage }
              key={ i }
            />
          )
        }) }

        <TouchableOpacity
          onPress={ () => this.props.updateFormState({ mode: null} ) }
          style={ styles.button }
        >
          <Text>Retreat!</Text>
        </TouchableOpacity>

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