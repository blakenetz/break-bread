import React, { Component } from "react";
import { ImageBackground, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import authStyles from "../../assets/styles/auth";
import AuthForm from "./form";
import AuthButtons from "./buttons";

class AuthView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: null, // 'signup', 'login', 'verify'
      message: "",
    };

    this.updateFormState = this.updateFormState.bind(this);
  }

  updateFormState(obj) {
    for (key in obj) {
      // setState for the AuthView component
      if (Object.keys(this.state).indexOf(key) > -1) {
        this.setState({
          [key]: obj[key],
        });
      }
      // pass it along to the App component
      else {
        this.props.updateAppState({
          [key]: obj[key],
        });
      }
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/blue-pinapple.png")}
        style={authStyles.imageBackground}
      >
        <Text style={authStyles.title}>Break Bread.</Text>

        {this.state.message.length > 0 ? (
          <Text style={authStyles.message}>{this.state.message}</Text>
        ) : null}

        {this.state.mode == null ? (
          <AuthButtons handlePress={this.updateFormState} />
        ) : (
          <AuthForm
            mode={this.state.mode}
            updateFormState={this.updateFormState}
          />
        )}
      </ImageBackground>
    );
  }
}

AuthView.propTypes = {
  updateAppState: PropTypes.func.isRequired,
};

export default AuthView;
