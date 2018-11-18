import React, { Component, Fragment } from 'react'
import {
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import mainStyles from '../../assets/styles/main'

const MainChat = ({}) => {
  return (
    <Fragment>
      <Text style={ mainStyles.title }>nom nom nom!</Text>

      <Text>Chat chat chat</Text>
    </Fragment>
  )
}

MainChat.propTypes = {}

export default MainChat