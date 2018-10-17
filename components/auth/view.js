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
      mode: null, // 'signup', 'login', 'verify'
    }

    this.updateAuthMode = this.updateAuthMode.bind(this)
  }

  updateAuthMode(mode) {
    this.setState({ mode: mode })
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>
          Break Bread.
        </Text>

        { this.state.mode == null
          ? <AuthButtons
              handlePress={ this.updateAuthMode }
            />
          : <AuthForm
              mode={this.state.mode}
              updateAuthMode={ this.updateAuthMode }
              updateParentState={ this.props.handleChildState }
            />
        }

      </View>
    )
  }
}