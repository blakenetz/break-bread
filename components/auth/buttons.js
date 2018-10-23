import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../assets/styles'

const AuthButtons = ({ handlePress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={ () => handlePress({ mode: 'login'}) }
        style={ styles.button }
      >
        <Text>Log in!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={ () => handlePress({ mode: 'signup'}) }
        style={ styles.button }
      >
        <Text>Sign up!</Text>
      </TouchableOpacity>

    </View>
  )
}

AuthButtons.propTypes = {
  handlePress: PropTypes.func.isRequired,
}

export default AuthButtons