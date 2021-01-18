import React, { Component } from 'react'
import {
	View,
  Text,
  FlatList,
} from 'react-native'
import PropTypes from 'prop-types'
import Amplify, { Auth } from 'aws-amplify'

import styles from '../../assets/styles'

class MainChat extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userData: [],
		}
	}

	async componentDidMount() {
		// get user data
    await Auth.currentAuthenticatedUser()
      .then( user => this.setState({
        userData: [
          { username: user.username },
          { phone: user.attributes.phone_number },
          { isPhoneVerified: user.attributes.phone_number_verified },
        ]
      }) )
      .catch( err => this.setState({ loggedin: false }) )
  }

  formatPhoneNumber (num) {
	  const cleaned = ('' + num).replace(/\D/g, '')
	  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
	  if (match) {
	    const intlCode = (match[1] ? '+1 ' : '')
	    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
	  }
	  return null
	}

	renderListItem(obj, i) {
		for (let key in obj) {

			switch (key) {
				case 'username':
					return (
						<View key={ i }>
							<Text>Username:</Text>
							<Text>{ obj[key] }</Text>
						</View>
					)
				case 'phone':
					return (
						<View key={ i }>
							<Text>Phone number:</Text>
							<Text>{ this.formatPhoneNumber(obj[key]) }</Text>
						</View>
					)
				case 'isPhoneVerified':
					return (
						<View key={ i }>
							<Text>Phone number verified:</Text>
							<Text>{ obj[key] ? 'Yes it is!' : "Not yet... how'd this even happen?" }</Text>
						</View>
					)
			}
		}
	}

	keyExtractor(item, i) {
		return `${i}`
	}

	render() {
	  return (
	    <View style={ styles.profile }>
	      <Text style={ styles.title }>You!</Text>

	      <FlatList
				  data={ this.state.userData }
				  renderItem={ ({ item, i }) => this.renderListItem(item, i) }
				  keyExtractor={ this.keyExtractor }
				/>

	      <Text>This is literally all the information we have on you. Be happy!</Text>
	    </View>
	  )
	}
}

MainChat.propTypes = {}

export default MainChat