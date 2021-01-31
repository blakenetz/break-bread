import React, {
  useReducer,
  useMemo,
  useState,
  useCallback,
  useEffect,
  createRef,
} from 'react';
import {string, func} from 'prop-types';
import {Text, Button} from '@ui-kitten/components';
import {StyleSheet, Keyboard} from 'react-native';
import Auth from '@aws-amplify/auth';

import Input from './input';

export const modes = {
  initial: 'INITIAL',
  signup: 'SIGNUP',
  login: 'LOGIN',
  verify: 'VERIFY',
  reverify: 'RE-VERIFY',
};

const passwordSchema = {
  name: 'password',
  errorMessage: 'Password needs to be at least 7 characters.',
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
    required: true,
  },
  password: passwordSchema,
  newPassword: {
    ...passwordSchema,
    textContentType: 'newPassword',
    placeholder: 'Make it difficult',
    required: true,
  },
  verify: {
    name: 'verify',
    label: 'Verification Code',
    placeholder: 'You should have received a spicy text',
    autoCompleteType: 'off',
    textContentType: 'oneTimeCode',
  },
  info: {
    name: 'info',
    label:
      'In order to verify your account, we need a phone number or email address',
    children: [
      {
        name: 'phone',
        label: 'Phone Number',
        autoCompleteType: 'tel',
        textContentType: 'telephoneNumber',
        keyboardType: 'phone-pad',
      },
      {
        name: 'email',
        textContentType: 'emailAddress',
        keyboardType: 'email-address',
      },
    ],
  },
};

const styles = StyleSheet.create({
  link: {textAlign: 'center', textDecorationLine: 'underline'},
  text: {paddingHorizontal: 8, paddingVertical: 8},
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

function WelcomeForm(props) {
  const {changeView, mode, setMessage} = props;

  const [refs, setRefs] = useState([]);
  const [errors, setErrors] = useState([]);

  const inputs = useMemo(() => {
    switch (mode) {
      case modes.verify:
        return [schema.verify];
      case modes.reverify:
        return [schema.username, schema.verify];
      case modes.signup:
        return [schema.newUsername, schema.newPassword, schema.info];
      case mode.login:
      default:
        return [schema.username, schema.password];
    }
  }, [mode]);

  useEffect(() => {
    // correct for children
    let length = input.length;
    inputs.forEach(input => {
      (input.children || []).forEach(() => (length += 1));
    });

    setRefs(prev => {
      return Array(length)
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
    if (mode === modes.signup) {
      if (!values.phone && !values.email) {
        setErrors(prev => prev.concat('info'));
        return;
      }
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
  }, [errors, values, mode, changeView, setMessage]);

  return (
    <>
      {inputs.map((input, i) => {
        const hasError = errors.includes(input.name);
        if (input.children) {
          return (
            <>
              <Text
                key={input.name}
                style={styles.text}
                category="c2"
                status={hasError ? 'danger' : 'basic'}>
                {input.label}
              </Text>

              {input.children.map((child, ii) => {
                const index = i + ii + 1;
                const isLast =
                  i === inputs.length - 1 && ii === input.children.length - 1;

                return (
                  <Input
                    input={child}
                    value={values[child.name]}
                    ref={refs[index]}
                    handleSubmitEditing={() => {
                      if (isLast) handleSubmit();
                      else refs[index + 1].current.focus();
                    }}
                    handleChange={val => {
                      dispatch({field: child.name, value: val});
                    }}
                    handleFocus={() => handleFocus(child)}
                    handleBlur={() => handleFocus(child)}
                    returnKeyType={isLast ? 'done' : 'next'}
                    hasError={errors.includes(child.name)}
                  />
                );
              })}
            </>
          );
        }

        return (
          <Input
            input={input}
            value={values[input.name]}
            ref={refs[i]}
            handleSubmitEditing={() => {
              if (isLast) handleSubmit();
              else refs[i + 1].current.focus();
            }}
            handleChange={val => dispatch({field: input.name, value: val})}
            handleFocus={() => handleFocus(input)}
            handleBlur={() => handleFocus(input)}
            autoFocus={i === 0}
            returnKeyType={i === inputs.length - 1 ? 'done' : 'next'}
            hasError={hasError}
          />
        );
      })}

      <Button onPress={handleSubmit} style={styles.input}>
        <Text>Submit!</Text>
      </Button>

      {Boolean(props.mode !== modes.verify) && (
        <Text
          onPress={() => props.changeView(modes.reverify)}
          style={styles.link}>
          Need to verify your account?
        </Text>
      )}

      {/* <AuthMenu handlePress={props.changeView} /> */}
    </>
  );
}

WelcomeForm.propTypes = {
  mode: string.isRequired,
  setMessage: func.isRequired,
  changeView: func.isRequired,
};

export default WelcomeForm;
