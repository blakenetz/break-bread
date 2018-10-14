import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#62fcbe',
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
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
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },

  label: {
    marginLeft: 10,
    color: '#FE638F',
    fontSize: 15,
  }
})

export default styles