import React from "react";
import { connect } from "react-redux";

import AuthView from "./auth/view";
import MainView from "./main/view";

const AuthCheck = props => {
  return props.isLoggedIn ? <MainView /> : <AuthView />;
};

const mapStateToProps = state => {
  const { isLoggedIn } = state;
  return { isLoggedIn };
};

export default connect(mapStateToProps)(AuthCheck);
