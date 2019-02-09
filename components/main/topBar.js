import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import mainStyles from "../../assets/styles/main";

const MainTopBar = ({ party }) => {
	return (
		<View style={mainStyles.topBar}>
			<Text style={mainStyles.title}>{party}</Text>
		</View>
	);
};

MainTopBar.propTypes = {
	party: PropTypes.string.isRequired
};

export default MainTopBar;
