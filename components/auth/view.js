import React, { Component } from 'react'
import {
  ImageBackground,
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

    this.updateFormState = this.updateFormState.bind(this)
  }

  updateFormState(obj) {
    for (key in obj) {
      // setState for the AuthView component
      if ( Object.keys(this.state).indexOf(key) > -1 ){
        this.setState({ [key]: obj[key] })
      }
      // pass it along to the App component
      else {
        this.props.updateAppState({ [key]: obj[key] })
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={ require('../../assets/images/blue-pinapple.png') }
        style={ styles.imageBackground }
      >
        <Text style={ styles.title }>
          Break Bread.
        </Text>

        { this.state.mode == null
          ? <AuthButtons
              handlePress={ this.updateFormState }
            />
          : <AuthForm
              mode={this.state.mode}
              updateFormState={ this.updateFormState }
            />
        }

      </ImageBackground>
    )
  }
}