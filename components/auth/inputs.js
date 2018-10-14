import React, { Component, Fragment } from 'react'
import { Text, TextInput } from 'react-native'
import styles from '../../assets/styles'

const AuthInput = ({
  name,
  label,
  value,
  handleChange,
  returnKey,
  keyboard,
  placeholder,
  autoFocus }) => {
  return (
    <Fragment>
      <Text style={ styles.label }>
        {label}
      </Text>
      <TextInput
        style={ styles.input }
        value={ value }
        onChangeText={ text => handleChange({ [name]: text }) }
        autoCapitalize='none'
        autoCorrect={ false }
        returnKeyType={ returnKey }
        keyboardType={ keyboard }
        placeholder={ placeholder }
        autoFocus={ autoFocus }
      />
    </Fragment>
  )
}

export default AuthInput