import React, {useState, forwardRef} from 'react';
import {Text, Input as UiKittenInput, Icon} from '@ui-kitten/components';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {string, func, bool, shape, object} from 'prop-types';

function extractLabel({name, label, required}) {
  return `${
    label || name.replace(/\w/, firstLetter => firstLetter.toUpperCase())
  }${required ? '*' : ''}`;
}

const styles = StyleSheet.create({
  input: {marginVertical: 10},
  label: {color: 'black', fontWeight: 'bold', fontSize: 14},
  caption: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontWeight: 'bold',
  },
});

const Input = forwardRef((props, ref) => {
  const [secureTextEntry, setSecureTextEntry] = useState(
    Boolean(props.input.accessoryRight),
  );

  return (
    <UiKittenInput
      key={props.input.name}
      value={props.value}
      ref={ref}
      // ui
      label={textProps => (
        <Text {...textProps} style={[textProps.style, styles.label]}>
          {extractLabel(props.input)}
        </Text>
      )}
      placeholder={props.input.placeholder || ''}
      style={[styles.input, props.style]}
      status={props.hasError ? 'danger' : 'basic'}
      // event handlers
      onChangeText={props.handleChange}
      onSubmitEditing={props.handleSubmitEditing}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      // native props
      autoCapitalize={props.input.autoCapitalize || 'none'}
      autoCompleteType={props.input.autoCompleteType || props.input.name}
      autoCorrect={false}
      autoFocus={props.autoFocus}
      keyboardType={props.input.keyboardType || 'default'}
      returnKeyType={props.returnKeyType}
      textContentType={props.input.textContentType || props.input.name}
      secureTextEntry={secureTextEntry}
      enablesReturnKeyAutomatically={
        props.input.enablesReturnKeyAutomatically || false
      }
      // accessories
      accessoryRight={iconProps => {
        if (!props.input.accessoryRight) return null;
        return (
          <TouchableWithoutFeedback
            onPress={() => setSecureTextEntry(prev => !prev)}>
            <Icon {...iconProps} name={secureTextEntry ? 'eye-off' : 'eye'} />
          </TouchableWithoutFeedback>
        );
      }}
      caption={textProps => {
        if (!props.hasError) return null;
        return (
          <Text {...textProps} style={[textProps.style, styles.caption]}>
            {props.input.errorMessage || 'Required'}
          </Text>
        );
      }}
    />
  );
});

Input.propTypes = {
  input: shape({
    name: string.isRequired,
    label: string,
    placeholder: string,
    autoCapitalize: string,
    autoCompleteType: string,
    keyboardType: string,
    textContentType: string,
    required: bool,
    errorMessage: string,
    accessoryRight: string,
    enablesReturnKeyAutomatically: bool,
  }).isRequired,
  value: string.isRequired,
  handleSubmitEditing: func.isRequired,
  handleChange: func.isRequired,
  handleFocus: func.isRequired,
  handleBlur: func.isRequired,
  autoFocus: bool,
  returnKeyType: string,
  hasError: bool,
  style: object,
};

Input.defaultProps = {
  autoFocus: false,
  returnKeyType: 'next',
  hasError: false,
  style: {},
};

export default Input;
