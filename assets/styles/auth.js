import { StyleSheet } from 'react-native'
import globalStyles from './global'

const authStyles = StyleSheet.create({

  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  formButtonPrimary: {
    backgroundColor: globalStyles.color.seafoam,
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
    borderColor: globalStyles.color.seafoam,
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  inputError: {
    backgroundColor: '#FFF',
    borderColor: globalStyles.color.red,
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

  homeIcon: {
    resizeMode: 'contain',
    position: 'absolute',
    bottom: '3%',
    right: '3%',
  },

  homeMenu: {
    position: 'absolute',
    bottom: '3%',
    right: '6%',
    backgroundColor: globalStyles.color.seafoam,
    height: 58,
    width: 58,
    borderTopRightRadius: 90,
    borderTopLeftRadius: 90,
    borderBottomRightRadius: 90,
    borderBottomLeftRadius: 90,
    justifyContent: 'center',
  },

  homeMenuText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'traveling-typewriter',
    fontSize: 20,
  },
})

export default authStyles