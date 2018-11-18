import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

import authStyles from '../../assets/styles/auth'

const AuthButtons = ({ handlePress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={ () => handlePress({ mode: 'login'}) }
        style={ authStyles.button }
      >
        <Text>Log in!</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={ () => handlePress({ mode: 'signup'}) }
        style={ authStyles.button }
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