import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../assets/styles';

const MainTopBar = ({party}) => {
  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>{party}</Text>
    </View>
  );
};

MainTopBar.propTypes = {
  party: PropTypes.string.isRequired,
};

export default MainTopBar;
