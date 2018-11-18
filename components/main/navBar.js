import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import mainStyles from '../../assets/styles/main'

const items = [
	{
		id: 'profile',
		text: 'Profile',
		icon: require('../../assets/images/egg.png'),
	},
	{
		id: 'nextMeal',
		text: 'Next Meal',
		icon: require('../../assets/images/hot-pot.png'),
	},
	{
		id: 'chat',
		text: 'Chat',
		icon: require('../../assets/images/cocktail.png'),
	},
]

const MainNavBar = ({ selectedView, handlePress }) => {
  return (
    <View style={ mainStyles.navBar }>
    	{ items.map(item => (
    			<TouchableOpacity
    				onPress={ () => handlePress(item.id) }
    				key={ item.id }
    			>

    				<Image
		          source={ item.icon }
		          style={ mainStyles.navBarIcon }
		        />
    				<Text style={ mainStyles.navBarText }>{ item.text }</Text>

    			</TouchableOpacity>
    	)) }
    </View>
  )
}

MainNavBar.propTypes = {
  selectedView: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
}

export default MainNavBar