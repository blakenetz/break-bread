import React, { Component } from "react";
import { ImageBackground } from "react-native";
import PropTypes from "prop-types";

// style
import mainStyles from "../../assets/styles/main";

// components
import MainTopBar from "./topBar";
import MainNavBar from "./navBar";

import MainProfile from "./profile";
import MainNextMeal from "./nextMeal";
import MainChat from "./chat";

class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			view: "nextMeal",
			party: "Test Party"
		};

		// bind methods
		this.handlePress = this.handlePress.bind(this);
	}

	handlePress(id) {
		this.setState({ view: id });
	}

	render() {
		return (
			<ImageBackground
				source={require("../../assets/images/octopus.png")}
				style={mainStyles.imageBackground}
			>
				<MainTopBar party={this.state.party} />

				{this.state.view == "profile" ? <MainProfile /> : null}
				{this.state.view == "nextMeal" ? <MainNextMeal /> : null}
				{this.state.view == "chat" ? <MainChat /> : null}

				<MainNavBar
					selectedView={this.state.view}
					handlePress={this.handlePress}
				/>
			</ImageBackground>
		);
	}
}

MainView.proptypes = {};

export default MainView;
