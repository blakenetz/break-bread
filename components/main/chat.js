import React, { Component, Fragment } from 'react'
import {
  Text,
} from 'react-native'

import styles from '../../assets/styles'

export default class MainChat extends Component {
  constructor(props) {
    super(props)

    this.state = {}

  }

  render() {
    return (
      <Fragment>
        <Text style={ styles.title }>nom nom nom!</Text>

        <Text>Chat chat chat</Text>
      </Fragment>
    )
  }
}