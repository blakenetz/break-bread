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

  message: {
    textAlign: 'center',
  },

  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
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
    backgroundColor: seafoam,
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

  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 100,
    backgroundColor: seafoam,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
  },

  navBarText: {
    fontFamily: 'traveling-typewriter',
    textAlign: 'center',
    padding: 0,
    marginTop: 10,
    marginBottom: 25,
  },

  navBarIcon: {
    height: 60,
    resizeMode: 'contain',
    padding: 0,
    margin: 0,
  },

  topBar: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: '100%',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },

})

export default styles