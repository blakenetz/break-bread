import { StyleSheet } from 'react-native'
import globalStyles from './global'

const mainStyles = StyleSheet.create({

  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 70,
    backgroundColor: globalStyles.colors.seafoam,
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
    marginTop: 5,
    marginBottom: 5,
  },

  navBarIcon: {
    height: 40,
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

  profile: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
})

export default mainStyles