import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProfilePicture from '../Common/ProfilePicture';

import PropTypes from "prop-types";


const GameTileRow = (props) => {
  const {name, score} = props;
  if (name !== '') {
      return (
        <View style={styles.row}>
          <ProfilePicture />
          <Text style={[styles.text, styles.name]}>{name}</Text>
          <Text style={styles.text}>{score}</Text>
        </View>
      )
  } else {
    return (
      <View style={styles.tile}>
        <ProfilePicture />
        <Text></Text>
        <Text style={styles.text}>{score}</Text>
      </View>
    )
  }

}

GameTileRow.propTypes = {
  score: PropTypes.number.isRequired,
  name: PropTypes.string,
}

GameTileRow.defaultProps = {
  name: ''
}

export default GameTileRow

const styles = StyleSheet.create({
  tile: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
    minWidth: 110,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5,
    alignSelf:'stretch',
    width: 300,
  },
  text: {
    fontSize: 24,
  },
  name: {
    
  }
})