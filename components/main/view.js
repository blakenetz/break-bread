import React, { Component } from 'react'
import { ImageBackground } from 'react-native'

// style
import styles from '../../assets/styles'

// components
import MainTopBar from './topBar'
import MainNavBar from './navBar'

import MainProfile from './profile'
import MainNextMeal from './nextMeal'
import MainChat from './chat'

export default class MainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'nextMeal',
      party: 'Test Party',
    }

    // bind methods
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    console.log('click')
  }

  render() {
    return (
      <ImageBackground
        source={ require('../../assets/images/octopus.png') }
        style={ styles.imageBackground }
      >

        <MainTopBar party={ this.state.party } />

        { this.state.view == 'profile' ? <MainProfile /> : null }
        { this.state.view == 'nextMeal' ? <MainNextMeal /> : null }
        { this.state.view == 'chat' ? <MainChat /> : null }

        <MainNavBar
          selectedView={ this.state.view}
          handlePress={ this.handlePress }
        />

      </ImageBackground>
    )
  }
}