import { StyleSheet } from 'react-native'
import globalStyles from './global'

const mainStyles = StyleSheet.create({

  // extend global styles
  imageBackground: globalStyles.styles.imageBackground,
  title: globalStyles.styles.title,
  message: globalStyles.styles.message,
  button: globalStyles.styles.button,

  // component styles
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
    fontFamily: globalStyles.fonts.header,
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
    height: '75%',
    paddingTop: 80,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
  },

  flatList: {
    marginTop: 30,
  },

  listItem: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderRadius: 10,
    borderTopColor: globalStyles.colors.purple,
    borderTopWidth: 10,
    borderBottomColor: globalStyles.colors.pink,
    borderBottomWidth: 10,
  },

  listItemKey: {
    fontSize: globalStyles.fonts.headerSize_3,
    textDecorationLine: 'underline',
  },
  listItemVal: {
    fontSize: globalStyles.fonts.bodySize_1,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: globalStyles.fonts.header,
  },

  profileHeader1: {
    textAlign: 'center',
    fontFamily: globalStyles.fonts.header,
    fontSize: globalStyles.fonts.headerSize_2,
  },
  profileHeader2: {
    textAlign: 'center',
    fontSize: globalStyles.fonts.headerSize_3,
  },

})

export default mainStyles