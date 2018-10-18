import React from 'react'
import PropTypes from 'prop-types'

const AuthButtons = ({ handlePress }) => {
  return (
    <div>
      <button onPress={ () => handlePress('login') }>
        Log in!
      </button>

      <button
        onPress={ () => handlePress('signup') }
      >
        Sign up!
      </button>
    </div>
  )
}

AuthButtons.propTypes = {
  handlePress: PropTypes.func.isRequired,
}

export default AuthButtons