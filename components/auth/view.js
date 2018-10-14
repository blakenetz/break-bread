import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'

import styles from '../../assets/styles'
import AuthForm from './form'
import AuthButtons from './buttons'

export default class AuthView extends Component {
  constructor(props){
    super(props)
    this.state = {
      mode: null,
    }

    this.handleLoginPress = this.handleLoginPress.bind(this)
    this.handleSignupPress = this.handleSignupPress.bind(this)
  }

  handleLoginPress() {
    this.setState({ mode: 'login' })
  }

  handleSignupPress() {
    this.setState({ mode: 'signup' })
  }


  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>
          Break Bread.
        </Text>

        { this.state.mode == null
          ? <AuthButtons
              handleLoginPress={ this.handleLoginPress }
              handleSignupPress={ this.handleSignupPress }
            />
          : <AuthForm mode={this.state.mode} /> }

      </View>
    )
  }
}