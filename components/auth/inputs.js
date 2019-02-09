import React, { Fragment } from "react";
import { Text, TextInput } from "react-native";
import PropTypes from "prop-types";

import authStyles from "../../assets/styles/auth";

const AuthInput = ({
	name,
	label,
	value,
	handleChange,
	handleBlur,
	returnKey,
	keyboard,
	textContent,
	placeholder,
	autoFocus,
	hasError,
	errorMessage
}) => {
	return (
		<Fragment>
			<Text style={authStyles.label}>{label}</Text>
			<TextInput
				style={hasError ? authStyles.inputError : authStyles.input}
				value={value}
				onChangeText={text => handleChange({ [name]: text })}
				onBlur={e => handleBlur({ [name]: e.nativeEvent.text })}
				autoCapitalize="none"
				autoCorrect={false}
				returnKeyType={returnKey}
				keyboardType={keyboard}
				textContentType={textContent}
				placeholder={placeholder}
				autoFocus={autoFocus}
			/>
			<Text style={authStyles.errorMessage}>
				{hasError ? errorMessage : ""}
			</Text>
		</Fragment>
	);
};

AuthInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
	returnKey: PropTypes.string.isRequired,
	keyboard: PropTypes.string.isRequired,
	textContent: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	autoFocus: PropTypes.bool.isRequired,
	hasError: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string.isRequired
};

export default AuthInput;
