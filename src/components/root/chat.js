import React, {Component, Fragment} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../assets/styles';

const MainChat = ({}) => {
  return (
    <Fragment>
      <Text style={styles.title}>nom nom nom!</Text>

      <Text>Chat chat chat</Text>
    </Fragment>
  );
};

MainChat.propTypes = {};

export default MainChat;
