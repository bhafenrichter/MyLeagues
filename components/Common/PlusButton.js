import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import PropTypes from 'prop-types'
import UniversalStyles from './../../utils/UniversalStyles';

const PlusButton = (props) => {
  const {onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[UniversalStyles.styles.card, styles.plus]}>+</Text>
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
    fontSize: 42,
    borderColor: 'black',
    width: 48,
    height: 48,
    textAlign: "center",
    justifyContent: 'center',
    alignContent: 'center',
  }
});