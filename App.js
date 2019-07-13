import React, { Component } from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";

// views
import AuthCheck from "./components/AuthCheck";

// AWS Amplify
import Amplify, { Auth } from "aws-amplify";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

class App extends Component {
  async componentDidMount() {
    // is user already logged in?
    await Auth.currentAuthenticatedUser()
      .then(user => this.setState({ loggedin: true }))
      .catch(err => this.setState({ loggedin: false }));

    // load fonts
    await Font.loadAsync({
      "traveling-typewriter": require("./assets/fonts/TravelingTypewriter.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        <AuthCheck />
      </Provider>
    );
  }
}

export default App;
