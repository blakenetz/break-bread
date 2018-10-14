import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import styles from '../../assets/styles'

export default class AuthButtons extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={ this.props.handleLoginPress }
          style={ styles.button }
        >
          <Text>Log in!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ this.props.handleSignupPress }
          style={ styles.button }
        >
          <Text>Sign up!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}