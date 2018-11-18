import { StyleSheet } from 'react-native'

const seafoam = '#62fcbe'
const blue = '#43A8B1'
const red = '#FF443A'

const globalStyles = {
  colors: {
    seafoam: seafoam,
    blue: blue,
    red: red,
  },

  styles: StyleSheet.create({
    title: {
      fontFamily: 'traveling-typewriter',
      fontSize: 30,
      textAlign: 'center',
      padding: 10,
    },

    message: {
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

    imageBackground: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
    },
  }),

}

export default globalStyles