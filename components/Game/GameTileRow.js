import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProfilePicture from '../Common/ProfilePicture';
import UniversalStyles from "./../../utils/UniversalStyles";

import PropTypes from "prop-types";


const GameTileRow = (props) => {
  const {name, score, showName, isWin} = props;
  if (showName) {
      return (
        <View style={[styles.base, styles.row]}>
          <ProfilePicture />
          <Text style={[styles.text, styles.name, isWin ? styles.win : styles.lose]}>
            {name}
            <Text style={[styles.text, styles.record, isWin ? styles.win : styles.lose]}>  8-9</Text>
          </Text>
          <Text style={[styles.text, styles.score, isWin ? styles.win : styles.lose]}>{score}</Text>
        </View>
      )
  }
  else {
    return (
      <View style={[styles.base, styles.tile]}>
        <ProfilePicture />
        <Text></Text>
        <Text style={[styles.text, isWin ? styles.win : styles.lose]}>{score}</Text>
      </View>
    )
  }

}

GameTileRow.propTypes = {
  scrollType: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  name: PropTypes.string,
}

GameTileRow.defaultProps = {
  name: ''
}

export default GameTileRow

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  tile: {
    justifyContent: "space-evenly",
    minWidth: 110,
  },
  row: {
  },
  text: {
    fontSize: 24,
  },
  name: {
    marginLeft: 10,
  },
  record: {
    fontSize: 14,
  },
  score: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
  },
  win: {
    color: 'black',
  },
  lose: {
    color: UniversalStyles.colors.grey,
  }
})