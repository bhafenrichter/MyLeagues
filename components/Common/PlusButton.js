import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NeomorphBox } from 'react-native-neomorph-shadows';

import PropTypes from 'prop-types'

const PlusButton = (props) => {
  const {onPress} = props;

  return (
    <NeomorphBox
      outer // <- enable shadow inside of neomorph
      useSvg
      swapShadowLevel // <- change zIndex of each shadow color
      style={{
        shadowRadius: 3,
        borderRadius: 25,
        backgroundColor: '#DDDDDD',
        width: 50,
        height: 50,
        margin: 5,
      }}
      >
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.plusText]}>+</Text>
      </TouchableOpacity>
    </NeomorphBox>
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
    color: 'grey',
  }
});