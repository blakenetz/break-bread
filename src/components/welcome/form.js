import React, {
  useReducer,
  useMemo,
  useState,
  useCallback,
  useEffect,
  createRef,
} from 'react';
import {string, func} from 'prop-types';
import {Text, Input, Button, Icon} from '@ui-kitten/components';
import {TouchableWithoutFeedback, StyleSheet, Keyboard} from 'react-native';
import Auth from '@aws-amplify/auth';

import AuthMenu from './menu';

const passwordSchema = {
  name: 'password',
  errorMessage: 'Password needs to be at least 7 characters and not obvious.',
  passwordRules: 'minlength: 7',
  accessoryRight: 'password',
  validate: val => val.length > 7,
};

const usernameSchema = {
  name: 'username',
  autoCapitalize: 'sentences',
  errorMessage: 'Please add a name. We need to call you something.',
  validate: val => val.length > 0,
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
    validate: val => val.length === 10,
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
  caption: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontWeight: 'bold',
  },
});

/**
 *
 * @param {object} state
 * @param {{field: string, value: any}} action
 *
 * @returns {object} state
 */
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
  const [refs, setRefs] = useState([]);
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

  useEffect(() => {
    setRefs(prev => {
      return Array(inputs.length)
        .fill()
        .map((_, i) => prev[i] || createRef());
    });
  }, [inputs]);

  const [values, dispatch] = useReducer(
    reducer,
    inputs.reduce((acc, {name}) => ({...acc, [name]: ''}), {}),
  );

  const handleBlur = useCallback(
    ({validate = () => true, name}) => {
      setErrors(prev => {
        return validate(values[name])
          ? prev.filter(err => err !== name)
          : [...prev, name];
      });
    },
    [setErrors, values],
  );

  const handleFocus = useCallback(
    ({name}) => {
      setErrors(prev => prev.filter(err => err !== name));
    },
    [setErrors],
  );

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
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
      Auth.confirmSignUp(values.username, values.verify, {
        forceAliasCreation: true,
      }).then(data => {
        console.debug('verify success!', data);
      });
      // .catch(err => this.handleError(err));
    }
  }, [errors, props, values]);

  return (
    <>
      {inputs.map((input, i) => {
        const isPassword = input.accessoryRight === 'password';
        const isLast = i === inputs.length - 1;
        const hasError = errors.includes(input.name);

        return (
          <Input
            key={input.name}
            ref={refs[i]}
            value={values[input.name]}
            // ui
            label={labelProps => (
              <Text {...labelProps} style={[labelProps.style, styles.label]}>
                {extractLabel(input)}
              </Text>
            )}
            placeholder={input.placeholder || ''}
            style={styles.input}
            status={hasError ? 'danger' : 'basic'}
            // event handlers
            onChangeText={val => dispatch({field: input.name, value: val})}
            onSubmitEditing={() => {
              if (isLast) handleSubmit();
              else refs[i + 1].current.focus();
            }}
            onFocus={() => handleFocus(input)}
            onBlur={() => handleBlur(input)}
            // native props
            autoCapitalize={input.autoCapitalize || 'none'}
            autoCompleteType={input.autoCompleteType || input.name}
            autoCorrect={false}
            autoFocus={i === 0}
            keyboardType={input.keyboardType || 'default'}
            returnKeyType={isLast ? 'done' : 'next'}
            textContentType={input.textContentType || input.name}
            secureTextEntry={isPassword && secureTextEntry}
            // accessories
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
            caption={textProps =>
              hasError ? (
                <Text {...textProps} style={[textProps.style, styles.caption]}>
                  {input.errorMessage || 'Required'}
                </Text>
              ) : null
            }
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
