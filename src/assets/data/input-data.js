export default {
  username: {
    name: 'username',
    placeholder: 'Make it fun!',
    autoCapitalize: 'sentences',
    errorMessage: 'Please add a name. We need to call you something.',
  },
  password: {
    name: 'password',
    placeholder: 'Make it difficult!',
    errorMessage: 'Password needs to be at least 7 characters and not obvious.',
  },
  phone: {
    name: 'phone',
    label: 'Phone Number',
    keyboard: 'phone-pad',
    textContent: 'telephoneNumber',
    placeholder: 'To verify that you are in fact you...',
    errorMessage: "That's not a number! 10 characters please.",
  },
  verify: {
    name: 'verify',
    label: 'Verification Code',
    textContent: 'none',
    placeholder: 'Expect a text message.',
  },
};
