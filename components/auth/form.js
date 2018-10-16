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

    // inputs
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
    }
    const phoneNumber = {
      name: 'phone',
      label: 'Phone Number',
      value: this.state.phone,
      handleChange: this.handleChange,
      handleBlur: this.validateInput,
      returnKey: 'done',
      keyboard: 'phone-pad',
      textContent: 'telephoneNumber',
      placeholder: 'Make it!',
      autoFocus: false,
    }
    this.inputs = [username, password, phoneNumber]

  }

  handleChange(obj) {
    for (key in obj) {
      this.setState({ [key]: obj[key] })
    }
  }

  validateInput(obj) {
    for (key in obj) {
      const notInErrors = ! this.state.errors.includes(key)
      const length = obj[key].trim().length

      if (notInErrors) {
        if ((key == 'username' && length < 3)
          || (key == 'password' && length < 7)
          || (key == 'phone' && length != 10)
        ){
          this.setState( prevState => prevState.errors.push(key) )
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

        { this.inputs.map((prop, i) => (
            <AuthInput
              name={ prop.name }
              label={ prop.label }
              value={ prop.value }
              handleChange={ prop.handleChange }
              handleBlur={ prop.handleBlur }
              returnKey={ prop.returnKey }
              keyboard={ prop.keyboard }
              textContent={ prop.textContent }
              placeholder={ prop.placeholder }
              autoFocus={ prop.autoFocus }
              hasError={ this.state.errors.includes(prop.name) }
              key={i}
            />
        )) }

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