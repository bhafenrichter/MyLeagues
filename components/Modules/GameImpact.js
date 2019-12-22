import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const GameImpact = (props) => {
  const {positionImpact, category} = props;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {positionImpact > 0 ? (
          <Ionicons name="ios-arrow-round-up" size={32} color="green" />
        ) : (
          <Ionicons name="ios-arrow-round-down" size={32} color="red" />
        )}
        
        <Text style={[styles.position, positionImpact > 0 ? styles.positive : styles.negative]}>{positionImpact}</Text>
      </View>
      <Text style={styles.category}>{category}</Text>
    </View>
  )
}

export default GameImpact

GameImpact.propTypes = {
  category: PropTypes.string.isRequired,
  positionImpact: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: 80,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: 'center',
  },
  position: {
    fontSize: 36,
    textAlignVertical: 'center',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  category: {
    textAlign: 'center',
  }
})