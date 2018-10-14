import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'

import styles from '../../assets/styles'

export default class AuthForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordSecondary: '',
      phone: ''
    }
  }

  render() {
    return (
      <View>
        <Text style={ styles.label }>
          Username
        </Text>
        <TextInput
          style={ styles.input }
          value={ this.state.username }
          onChangeText={ text => this.setState({ username: text }) }
          autoCapitalize='none'
          autoCorrect={ false }
          returnKeyType='next'
          placeholder="Make it fun!"
          autoFocus={ true }
        />

        <Text style={ styles.label }>
          Password
        </Text>
        <TextInput
          style={ styles.input }
          value={ this.state.password }
          onChangeText={ text => this.setState({ password: text }) }
          autoCapitalize='none'
          autoCorrect={ false }
          returnKeyType='next'
          placeholder="No requirements here"
        />

        <Text style={ styles.label }>
          Confirm Password
        </Text>
        <TextInput
          style={ styles.input }
          value={ this.state.passwordSecondary }
          onChangeText={ text => this.setState({ passwordSecondary: text }) }
          autoCapitalize='none'
          autoCorrect={ false }
          returnKeyType='next'
          placeholder="Make sure you got it right"
        />

        <Text style={ styles.label }>
          Phone Number
        </Text>
        <TextInput
          style={ styles.input }
          value={ this.state.phone }
          onChangeText={ number => this.setState({ phone: number }) }
          autoCapitalize='none'
          autoCorrect={ false }
          returnKeyType='done'
          keyboardType='phone-pad'
          placeholder="So we can verify you are in fact you"
        />
      </View>
    )
  }
}