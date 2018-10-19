import { StyleSheet } from 'react-native'

const bgColor = '#62fcbe'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'traveling-typewriter',
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },

  nextMeal: {
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#FE638F',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  input: {
    backgroundColor: '#FFF',
    borderColor: bgColor,
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  inputError: {
    backgroundColor: '#FFF',
    borderColor: '#F00',
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  label: {
    marginLeft: 10,
    color: '#FE638F',
    fontSize: 15,
  },

  errorMessage: {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: -15,
    color: 'black',
    fontSize: 15,
  },

})

export default styles