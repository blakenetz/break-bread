// fonts
const header = 'traveling-typewriter'


// colors
const seafoam = '#62fcbe'
const blue = '#43A8B1'
const red = '#FF443A'
const green = '#3D9974'
const purple = '#9F14CC'
const pink = '#FF40F4'

const globalStyles = {
  colors: {
    seafoam: seafoam,
    blue: blue,
    red: red,
    green: green,
    purple: purple,
    pink: pink,
  },

  fonts: {
    header: header,
    headerSize_1: 30,
    headerSize_2: 25,
    headerSize_3: 20,
    bodySize_1: 18,
    bodySize_2: 15,

  },

  styles: {
    title: {
      fontFamily: header,
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
  },

}

export default globalStyles