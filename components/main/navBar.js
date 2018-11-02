import React from 'react'
import {
  View,
  Text,
} from 'react-native'
import PropTypes from 'prop-types'

import styles from '../../assets/styles'

const items = [
	{
		id: 'profile',
		text: 'Profile',
		icon: '',
	},
	{
		id: 'nextMeal',
		text: 'Next Meal',
		icon: '',
	},
	{
		id: 'chat',
		text: 'Chat',
		icon: '',
	},
]

const MainNavBar = ({ selectedView, handlePress }) => {
  return (
    <View style={ styles.navBar }>
    	{ items.map(item => (
    			<View key={ item.id }>
    				<Text style={ styles.navBarText }>{ item.text }</Text>
    			</View>
    	)) }
    </View>
  )
}

MainNavBar.propTypes = {
  selectedView: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
}

export default MainNavBar