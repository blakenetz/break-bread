import React, { Component, Fragment } from 'react'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'
import Auth from '@aws-amplify/auth'

import styles from '../../assets/styles'

const MainChat = ({}) => {
  return (
    <Fragment>
      <Text style={ styles.title }>nom nom nom!</Text>

      <Text>This is the profile page bebe</Text>
    </Fragment>
  )
}

MainChat.propTypes = {}


export default MainChat