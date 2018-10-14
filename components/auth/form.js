import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'

import styles from '../../assets/styles'
import AuthInput from './inputs'

export default class AuthForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      phone: ''
    }

    this.handleChange = this.handleChange.bind(this)

    const username = {
      name: 'username',
      label: 'Username',
      value: this.state.username,
      handleChange: this.handleChange,
      returnKey: 'next',
      keyboard: 'default',
      placeholder: 'Make it fun!',
      autoFocus: true,
    }
    const password = {
      name: 'password',
      label: 'Password',
      value: this.state.password,
      handleChange: this.handleChange,
      returnKey: 'next',
      keyboard: 'default',
      placeholder: 'Make it difficult!',
      autoFocus: false,
    }
    const phoneNumber = {
      name: 'phone',
      label: 'Phone Number',
      value: this.state.phone,
      handleChange: this.handleChange,
      returnKey: 'done',
      keyboard: 'phone-pad',
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

  render() {
    return (
      this.inputs.map((prop, i) => (
          <AuthInput
            name={ prop.name }
            label={ prop.label }
            value={ prop.value }
            handleChange={ prop.handleChange }
            returnKey={ prop.returnKey }
            keyboard={ prop.keyboard }
            placeholder={ prop.placeholder }
            autoFocus={ prop.autoFocus }
            key={i}
          />
      ))
    )
  }
}