import React, { Component, Fragment } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

import { GiftedChat } from "react-native-gifted-chat";

import mainStyles from "../../assets/styles/main";

class MainChat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: []
		};

		// bind methods
		this.onSend = this.onSend.bind(this);
	}

	componentDidMount() {
		this.setState({
			messages: [
				{
					_id: 1,
					text: "Hello developer",
					createdAt: new Date(),
					user: {
						_id: 2,
						name: "React Native",
						avatar: "https://placeimg.com/140/140/any"
					}
				}
			]
		});
	}

	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages)
		}));
	}

	render() {
		return (
			<View style={mainStyles.chatWrapper}>
				<GiftedChat
					style={mainStyles.chat}
					messages={this.state.messages}
					onSend={messages => this.onSend(messages)}
					user={{
						_id: 1
					}}
				/>
			</View>
		);
	}
}

MainChat.propTypes = {};

export default MainChat;
