import React, {PureComponent} from 'react';
import {Text, Pressable} from 'react-native';
import Auth from '@aws-amplify/auth';
import {string, func} from 'prop-types';

// views
import inputData from '../../assets/data/input-data';
import AuthInput from './inputs';
import AuthMenu from './menu';

import styles from '../../assets/styles';

class AuthForm extends PureComponent {
  static propTypes = {
    mode: string.isRequired,
    updateFormState: func.isRequired,
    setMessage: func.isRequired,
    onSubmit: func.isRequired,
  };

  state = {
    username: '',
    password: '',
    phone: '',
    verify: '',
    errors: [],
    isExpanded: false,
  };

  handleError(err: any) {
    console.error('crap an error: ', err);
  }

  handleChange(obj: {[x: string]: string}) {
    for (const key in obj) {
      this.setState({
        // remove non-digit characters from phone number
        [key]:
          key === 'phone'
            ? obj[key].trim().replace(/\D/g, '')
            : obj[key].trim(),
      });
    }
  }

  handleHomeIconPress() {
    this.setState((prevState) => {
      return {isExpanded: !prevState.isExpanded};
    });
  }

  validateInput(obj: {[x: string]: any}) {
    for (const key in obj) {
      const i = this.state.errors.indexOf(key);
      const val = obj[key];

      if (
        (key === 'username' && val.length === 0) ||
        (key === 'password' && val.length < 8) ||
        (key === 'phone' && val.length !== 10)
      ) {
        // add to errors
        if (i === -1) {
          this.setState((prevState) => {
            return {errors: [...prevState.errors, key]};
          });
        }
      } else {
        // remove from errors
        if (i > -1) {
          this.setState((prevState) => {
            return {
              errors: prevState.errors.filter((error: any) => error !== key),
            };
          });
        }
      }
    }
  }

  async handleSubmit() {
    // ERROR CHECK
    if (this.state.errors.length > 0) {
      return;
    }

    // SIGN UP
    if (this.props.mode == 'signup') {
      await Auth.signUp({
        username: this.state.username,
        password: this.state.password,
        attributes: {
          phone_number: `+1${this.state.phone}`, // E.164 number convention
        },
      })
        .then((data) => {
          console.log('signup success!', data);
          if (data.user) {
            this.props.setMessage(
              'Congrats! Expect a text message with your verification code 🥠',
            );
            this.props.onSubmit('verify');
          }
        })
        .catch((err) => {
          this.handleError(err);
          // user already exists
          this.props.setMessage(
            `Well crud... something bad happened: ${err.code}`,
          );
          this.props.onSubmit('login');
        });
    }

    // LOGIN
    else if (this.props.mode === 'login') {
      await Auth.signIn(this.state.username, this.state.password)
        .then((data) => {
          console.log('signIn success!', data);
        })
        .catch((err) => this.handleError(err));
    }

    // VERIFY
    else {
      await Auth.confirmSignUp(this.state.username, this.state.verify, {
        forceAliasCreation: true,
      })
        .then((data) => {
          console.log('verify success!', data);
        })
        .catch((err) => this.handleError(err));
    }
  }

  updateInputs() {
    switch (this.props.mode) {
      case 'signup':
        this.inputs = [inputData.username, inputData.password, inputData.phone];
        break;
      case 'login':
        this.inputs = [inputData.username, inputData.password];
        break;
      case 'verify':
        this.inputs = [inputData.verify];
        break;
      case 're-verify':
        this.inputs = [inputData.username, inputData.verify];
        break;
    }
  }

  componentDidUpdate(prevProps: {mode: any}, prevState: any) {
    if (prevProps.mode !== this.props.mode) {
      this.updateInputs();
    }
  }

  render() {
    return (
      <>
        {this.inputs.map(
          (
            input: {
              name: string;
              label: string;
              handleChange: (...args: any[]) => any;
              handleBlur: (...args: any[]) => any;
              returnKey: string;
              keyboard: string;
              textContent: string;
              placeholder: string;
              autoFocus: boolean;
              autoCapitalize: any;
              hasError: any;
              errorMessage: string;
            },
            i: string | number | null | undefined,
          ) => {
            return (
              <AuthInput
                name={input.name}
                label={input.label}
                value={this.state[input.name]}
                handleChange={input.handleChange}
                handleBlur={input.handleBlur}
                returnKey={input.returnKey}
                keyboard={input.keyboard}
                textContent={input.textContent}
                placeholder={input.placeholder}
                autoFocus={input.autoFocus}
                autoCapitalize={input.autoCapitalize}
                hasError={
                  input.hasError || this.state.errors.indexOf(input.name) > -1
                }
                errorMessage={input.errorMessage}
                key={i}
              />
            );
          },
        )}

        <Pressable onPress={this.handleSubmit} style={styles.formButtonPrimary}>
          <Text>Submit!</Text>
        </Pressable>

        {Boolean(this.state.mode !== 'verify') && (
          <Text
            onPress={() => this.props.onSubmit('re-verify')}
            style={styles.link}>
            Need to verify your account?
          </Text>
        )}

        <AuthMenu handlePress={this.props.onSubmit} />
      </>
    );
  }
}

export default AuthForm;
