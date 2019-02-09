import React, { Component, Fragment } from 'react'
import {
    Text,
    TouchableOpacity,
    DatePickerIOS,
} from 'react-native'
import PropTypes from 'prop-types'

import mainStyles from '../../assets/styles/main'

class MainNextMeal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // dates
            showDatePicker: false,
            chosenDate: new Date(Date.now() + 12096e5), // 2 weeks from today
            minDate: new Date(),
            maxDate: new Date(Date.now() + (12096e5 * 2)), // 4 weeks from today

            // themes
            showThemePicker: false,
            chosenTheme: null,
        }

        // bind functions
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

    handlePress(type) {
        if (type == 'date')
            this.setState({ showDatePicker: !this.state.showDatePicker })
        else
            this.setState({ showThemePicker: !this.state.showThemePicker })
    }

    render() {
        return (
            <Fragment>
        <Text style={ mainStyles.title }>nom nom nom!</Text>

        <Text style={ mainStyles.message }>
          Next family dinner is {this.formatDate(this.state.chosenDate)}
        </Text>

        <TouchableOpacity
          onPress={ () => this.handlePress('date') }
          style={ mainStyles.button }
        >
          <Text>Pick a Date!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => this.handlePress('theme') }
          style={ mainStyles.button }
        >
          <Text>Pick a Theme!</Text>
        </TouchableOpacity>

        { this.state.showDatePicker
          ? <DatePickerIOS
              date={ this.state.chosenDate }
              onDateChange={ this.setDate }
              mode='datetime'
              minimumDate={ this.state.minDate }
              maximumDate={ this.state.maxDate }
              minuteInterval={15}
            />
          : null }

        { this.state.showThemePicker
          ? <Text>THEME PICKER PLACEHOLDER</Text>
          : null }
      </Fragment>
        )
    }
}

MainNextMeal.propTypes = {}

export default MainNextMeal