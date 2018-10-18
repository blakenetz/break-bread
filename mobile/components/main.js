import React, { Component } from 'react'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // dates
      showDatePicker: false,
      chosenDate: new Date(Date.now() + 12096e5), // 2 weeks from today
      minDate: new Date(),
      maxDate: new Date(Date.now() + (12096e5*2)), // 4 weeks from today

      // themes
      showThemePicker: false,
      chosenTheme: null,
    }

    this.setDate = this.setDate.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.handleDatePress = this.handleDatePress.bind(this)
    this.handleThemePress = this.handleThemePress.bind(this)
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

  handleDatePress() {
    this.setState({ showDatePicker: ! this.state.showDatePicker })
  }

  handleThemePress() {
    this.setState({ showThemePicker: ! this.state.showThemePicker })
  }


  render() {
    return (
      <View style={ styles.container }>

        <Text style={ styles.title }>nom nom nom!</Text>
        <Text style={ styles.nextMeal }>
          Next family dinner is {this.formatDate(this.state.chosenDate)}
        </Text>

        <TouchableOpacity
          onPress={ this.handleDatePress }
          style={ styles.button }
        >
          <Text>Pick a Date!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ this.handleThemePress }
          style={ styles.button }
        >
          <Text>Pick a Theme!</Text>
        </TouchableOpacity>

        { this.state.showDatePicker
          ? <DatePickerIOS
              date={ this.state.chosenDate }
              onDateChange={ this.setDate }
              mode='datetime'
              minimumDate={ this.minDate }
              maximumDate={ this.maxDate }
              minuteInterval={15}
            />
          : null }

        { this.state.showThemePicker
          ? <Text>THEME PICKER PLACEHOLDER</Text>
          : null }

      </View>
    )
  }
}