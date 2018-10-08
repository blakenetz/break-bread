import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  TouchableHighlight,
} from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDate: new Date(Date.now() + 12096e5), // 2 weeks from today
      minDate: new Date(),
      maxDate: new Date(Date.now() + (12096e5*2)), // 4 weeks from today
    }

    this.setDate = this.setDate.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.handlePress = this.handlePress.bind(this)
  }

  setDate(date) {
    this.setState({ chosenDate: date })
  }

  formatDate(date) {
    const dateOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', dateOptions)
  }

  handlePress() {
    console.log('press')
  }


  render() {
    return (
      <View style={ styles.container }>

        <Text style={ styles.title }>nom nom nom!</Text>
        <Text style={ styles.nextMeal }>
          Next family dinner is {this.formatDate(this.state.chosenDate)}
        </Text>

        <TouchableHighlight
          style={ styles.button }
          onPress={ this.handlePress }
        >
          <Text>Pick a Date!</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={ styles.button }
          onPress={ this.handlePress }
        >
          <Text>Pick a Theme!</Text>
        </TouchableHighlight>

        <DatePickerIOS
          date={ this.state.chosenDate }
          onDateChange={ this.setDate }
          mode='date'
          minimumDate={ this.minDate }
          maximumDate={ this.maxDate }
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62fcbe',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
    padding: 10,
  },

  nextMeal: {
    textAlign: 'center',
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#FE638F',
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
})
