import React, { Component, Fragment } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Auth from '@aws-amplify/auth'

// views
import inputData from './inputData'
import AuthInput from './inputs'
import styles from '../../assets/styles'

export default class AuthForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      phone: '',
      verify: '',
      errors: [],
    }

    // bind methods
    this.handleChange = this.handleChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleError = this.handleError.bind(this)
    this.updateInputs = this.updateInputs.bind(this)

    // inputs (updated in componentDidMount)
    this.inputs = []
    for (input in inputData) {
      inputData[input].value = this.state[inputData[input].name]
      inputData[input].handleChange = this.handleChange
      inputData[input].handleBlur = this.validateInput
    }
    this.updateInputs()
  }

  handleError(err) {
    console.error('crap an error: ', err)
  }

  handleChange(obj) {
    for (key in obj) {
      this.setState({ [key]: obj[key] })
    }
  }

  validateInput(obj) {
    for (key in obj) {
      const i = this.state.errors.indexOf(key)
      const length = obj[key].trim().length

      if ((key == 'username' && length == 0)
        || (key == 'password' && length < 8)
        || (key == 'phone' && length != 10)
      ){
        // add to errors
        if (i == -1) {
          this.setState( prevState => {
            return { errors: [...prevState.errors, key] }
          })
        }
      }
      else {
        // remove from errors
        if (i > -1) {
          this.setState( prevState => {
            return { errors: prevState.errors.filter(error => error !== key) }
          })
        }
      }
    }
  }

  async handleSubmit() {
    // ERROR CHECK
    if (this.state.errors.length > 0) return;

    // SIGN UP
    if (this.props.mode == 'signup') {
      await Auth.signUp({
        username: this.state.username,
        password: this.state.password,
        attributes: {
          phone_number: `+1${this.state.phone}`, // E.164 number convention
        },
      })
        .then(data => {
          console.log('signup success!', data)
          if (data.user) {
            this.props.updateFormState({
              mode: 'verify',
              username: this.state.username,
            })
          }

        })
        .catch(err => {
          this.handleError(err)
          // user already exists
          this.props.updateFormState({
            mode: 'login',
            message: err.code,
          })
        })
    }

    // LOGIN
    else {
      await Auth.signIn(this.state.username, this.state.password)
        .then(data => {
          console.log('signin success!', data)
          this.props.updateFormState({
            loggedin: true,
            username: this.state.username,
          })
        })
        .catch(err => this.handleError(err))
    }
  }

  updateInputs() {
    switch (this.props.mode) {
      case ('signup'):
        this.inputs = [inputData.username, inputData.password, inputData.phone]; break;
      case ('login'):
        this.inputs = [inputData.username, inputData.password]; break;
      case ('verify'):
        this.inputs = [inputData.verify]; break;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      this.updateInputs()
    }
  }

  render() {
    return (
      <Fragment>
        { this.inputs.map((input, i) => {
          return (
            <AuthInput
              name={ input.name }
              label={ input.label }
              value={ input.value }
              handleChange={ input.handleChange }
              handleBlur={ input.handleBlur }
              returnKey={ input.returnKey }
              keyboard={ input.keyboard }
              textContent={ input.textContent }
              placeholder={ input.placeholder }
              autoFocus={ input.autoFocus }
              autoCapitalize={ input.autoCapitalize }
              hasError={ input.hasError || (this.state.errors.indexOf(input.name) > -1) }
              errorMessage={ input.errorMessage }
              key={ i }
            />
          )
        }) }

        <TouchableOpacity
          onPress={ this.handleSubmit }
          style={ styles.formButtonPrimary }
        >
          <Text>Submit!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={ () => this.props.updateFormState({ mode: null} ) }
          style={ styles.formButtonSecondary }
        >
          <Text>Retreat!</Text>
        </TouchableOpacity>

      </Fragment>
    )
  }
}