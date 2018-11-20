import { StyleSheet } from 'react-native'
import globalStyles from './global'

const authStyles = StyleSheet.create({

  // extend global styles
  imageBackground: globalStyles.styles.imageBackground,
  title: globalStyles.styles.title,
  message: globalStyles.styles.message,
  button: globalStyles.styles.button,

  // component styles
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  formButtonPrimary: {
    backgroundColor: globalStyles.colors.seafoam,
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
    borderColor: globalStyles.colors.seafoam,
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  inputError: {
    backgroundColor: '#FFF',
    borderColor: globalStyles.colors.red,
    borderWidth: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  label: {
    marginLeft: 10,
    color: '#000',
    fontSize: globalStyles.fonts.bodySize_2,
  },

  errorMessage: {
    marginLeft: 10,
    marginBottom: 20,
    marginTop: -15,
    color: 'black',
    fontSize: globalStyles.fonts.bodySize_2,
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
    backgroundColor: globalStyles.colors.seafoam,
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
    fontFamily: globalStyles.fonts.header,
    fontSize: globalStyles.fonts.headerSize_3,
  },
})

export default authStyles