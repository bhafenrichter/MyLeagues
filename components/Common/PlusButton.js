import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import PropTypes from 'prop-types'
import UniversalStyles from './../../utils/UniversalStyles';

const PlusButton = (props) => {
  const {onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[UniversalStyles.colors.red, UniversalStyles.colors.purple]} style={styles.plus}>
        <Text style={[styles.plusText]}>+</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

PlusButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default PlusButton

const styles = StyleSheet.create({
  plus: {
    margin: 5,
    borderRadius: 45,
    width: 48,
    height: 48,
  },
  plusText: {
    textAlign: "center",
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 42,
    color: 'white',
  }
});