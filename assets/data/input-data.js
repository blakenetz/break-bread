const inputData = {
  username: {
    name: 'username',
    label: 'Username',
    returnKey: 'next',
    keyboard: 'default',
    textContent: 'username',
    placeholder: 'Make it fun!',
    autoFocus: true,
    autoCapitalize: 'sentences',
    errorMessage: 'Please add a name. We need to call you something.',
  },
  password: {
    name: 'password',
    label: 'Password',
    returnKey: 'next',
    keyboard: 'default',
    textContent: 'password',
    placeholder: 'Make it difficult!',
    autoFocus: false,
    autoCapitalize: 'none',
    errorMessage: 'Password needs to be at least 7 characters and not obvious.',
  },
  phone: {
    name: 'phone',
    label: 'Phone Number',
    returnKey: 'done',
    keyboard: 'phone-pad',
    textContent: 'telephoneNumber',
    placeholder: 'To verify that you are in fact you...',
    autoFocus: false,
    autoCapitalize: 'none',
    errorMessage: "That's not a number! 10 characters please.",
  },
  verify: {
    name: 'verify',
    label: 'Verification Code',
    returnKey: 'done',
    keyboard: 'default',
    textContent: 'none',
    placeholder: 'Expect a text message.',
    autoFocus: true,
    autoCapitalize: 'none',
    hasError: false,
    errorMessage: '',
  }
}

export default inputData