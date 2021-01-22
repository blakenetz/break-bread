import React, {useReducer, useMemo, useState, useCallback} from 'react';
import {string, func, bool} from 'prop-types';
import {Text, Input, Button, Icon} from '@ui-kitten/components';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Auth from '@aws-amplify/auth';

import AuthMenu from './menu';

const passwordSchema = {
  name: 'password',
  errorMessage: 'Password needs to be at least 7 characters and not obvious.',
  passwordRules: 'minlength: 7',
  accessoryRight: 'password',
};

const usernameSchema = {
  name: 'username',
  autoCapitalize: 'sentences',
  errorMessage: 'Please add a name. We need to call you something.',
};

const schema = {
  username: usernameSchema,
  newUsername: {
    ...usernameSchema,
    placeholder: 'Make it weird',
  },
  password: passwordSchema,
  newPassword: {
    ...passwordSchema,
    textContentType: 'newPassword',
    placeholder: 'Make it difficult',
  },
  phone: {
    name: 'phone',
    label: 'Phone Number',
    placeholder: 'To verify that you are in fact you...',
    autoCompleteType: 'tel',
    textContentType: 'telephoneNumber',
    keyboardType: 'phone-pad',
    textContent: 'telephoneNumber',
    errorMessage: "That's not a phone number! 10 characters please.",
  },
  verify: {
    name: 'verify',
    label: 'Verification Code',
    placeholder: 'You should have received a spicy text',
    autoCompleteType: 'off',
    textContent: 'none',
    textContentType: 'oneTimeCode',
  },
};

const styles = StyleSheet.create({
  link: {textAlign: 'center', textDecorationLine: 'underline'},
  input: {margin: 10},
  label: {color: 'black', fontWeight: 'bold', fontSize: 14},
});

function reducer(state, action) {
  const {field, value} = action;
  return {
    ...state,
    [field]: value,
  };
}

/**
 * capitalizes label
 * @param {{label?: string, name: string}} input
 */
function extractLabel({label, name}) {
  return label || name.replace(/\w/, firstLetter => firstLetter.toUpperCase());
}

function WelcomeForm(props) {
  const [secureTextEntry, setSecureTextEntry] = useState(
    props.mode === 'signup' || props.mode === 'login',
  );
  const [errors, setErrors] = useState([]);

  const inputs = useMemo(() => {
    switch (props.mode) {
      case 'verify':
        return [schema.verify];
      case 're-verify':
        return [schema.username, schema.verify];
      case 'signup':
        return [schema.newUsername, schema.newPassword, schema.phone];
      case 'login':
      default:
        return [schema.username, schema.password];
    }
  }, [props.mode]);

  // const validate(obj) {
  //   for (const key in obj) {
  //     const i = this.state.errors.indexOf(key);
  //     const val = obj[key];

  //     if (
  //       (key === 'username' && val.length === 0) ||
  //       (key === 'password' && val.length < 8) ||
  //       (key === 'phone' && val.length !== 10)
  //     ) {
  //       // add to errors
  //       if (i === -1) {
  //         this.setState((prevState) => {
  //           return {errors: [...prevState.errors, key]};
  //         });
  //       }
  //     } else {
  //       // remove from errors
  //       if (i > -1) {
  //         this.setState((prevState) => {
  //           return {
  //             errors: prevState.errors.filter((error: any) => error !== key),
  //           };
  //         });
  //       }
  //     }
  //   }
  // }

  const handleSubmit = useCallback(async () => {
    // ERROR CHECK
    if (errors.length > 0) return;

    // SIGN UP
    if (props.mode === 'signup') {
      Auth.signUp({
        username: values.username,
        password: values.password,
        attributes: {phone_number: `+1${values.phone}`}, // E.164 number convention
      })
        .then(data => {
          console.debug('signup success!', data);
          if (data.user) {
            props.setMessage(
              'Congrats! Expect a text message with your verification code 🥠',
            );
            props.onSubmit('verify');
          }
        })
        .catch(err => {
          // this.handleError(err);
          // user already exists
          props.setMessage(`Well crud... something bad happened: ${err.code}`);
          props.onSubmit('login');
        });
    }

    // LOGIN
    else if (props.mode === 'login') {
      Auth.signIn(values.username, values.password).then(data => {
        console.debug('signIn success!', data);
      });
      // .catch(err => this.handleError(err));
    }

    // VERIFY
    else {
      await Auth.confirmSignUp(values.username, values.verify, {
        forceAliasCreation: true,
      }).then(data => {
        console.debug('verify success!', data);
      });
      // .catch(err => this.handleError(err));
    }
  }, [errors, props, values]);

  const [values, dispatch] = useReducer(
    reducer,
    inputs.reduce((acc, {name}) => ({...acc, [name]: ''}), {}),
  );

  return (
    <>
      {inputs.map((input, i) => {
        const isPassword = input.accessoryRight === 'password';
        return (
          <Input
            key={input.name}
            value={values[input.name]}
            onChangeText={val => dispatch(input.name, val)}
            label={labelProps => (
              <Text {...labelProps} style={[labelProps.style, styles.label]}>
                {extractLabel(input)}
              </Text>
            )}
            placeholder={input.placeholder || ''}
            autoCapitalize={input.autoCapitalize || 'none'}
            autoCompleteType={input.autoCompleteType || input.name}
            autoCorrect={false}
            autoFocus={i === 0}
            keyboardType={input.keyboardType || 'default'}
            returnKeyType={i === inputs.length - 1 ? 'done' : 'next'}
            textContentType={input.textContentType || input.name}
            secureTextEntry={isPassword && secureTextEntry} // @todo set for password field
            accessoryRight={
              isPassword
                ? iconProps => (
                    <TouchableWithoutFeedback
                      onPress={() => setSecureTextEntry(prev => !prev)}>
                      <Icon
                        {...iconProps}
                        name={secureTextEntry ? 'eye-off' : 'eye'}
                      />
                    </TouchableWithoutFeedback>
                  )
                : undefined
            }
            style={styles.input}
            status={errors.includes(input.name) ? 'warning' : 'basic'}
          />
        );
      })}

      <Button onPress={handleSubmit} style={styles.input}>
        <Text>Submit!</Text>
      </Button>

      {Boolean(props.mode !== 'verify') && (
        <Text onPress={() => props.onSubmit('re-verify')} style={styles.link}>
          Need to verify your account?
        </Text>
      )}

      {/* <AuthMenu handlePress={props.onSubmit} /> */}
    </>
  );
}

WelcomeForm.propTypes = {
  mode: string.isRequired,
  setMessage: func.isRequired,
  onSubmit: func.isRequired,
};

export default WelcomeForm;
