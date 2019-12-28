import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import PropTypes from 'prop-types'

const PlusButton = (props) => {
  const {onPress} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  )
}

PlusButton.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default PlusButton

const styles = StyleSheet.create({
  plus: {
    fontSize: 36,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'black',
    width: 48,
    height: 48,
    textAlign: "center",
  }
});