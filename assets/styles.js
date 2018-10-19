import { StyleSheet } from 'react-native'

const seafoam = '#62fcbe'
const blue = '#43A8B1'
const red = '#FF443A'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: seafoam,
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
    backgroundColor: red,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  formButtonPrimary: {
    backgroundColor: seafoam,
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  formButtonSecondary: {
    backgroundColor: blue,
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
    borderColor: seafoam,
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  inputError: {
    backgroundColor: '#FFF',
    borderColor: red,
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  label: {
    marginLeft: 10,
    color: '#000',
    fontSize: 15,
  },

  errorMessage: {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: -15,
    color: 'black',
    fontSize: 15,
  },

  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
  },

})

export default styles