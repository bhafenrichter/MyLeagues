import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import GameImpact from './GameImpact'
import UniversalStyles from './../../utils/UniversalStyles';

export class GameImpactRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>HAF</Text>
        <View style={styles.impacts}>
          <GameImpact positionImpact="-1" category="Standings" />
          <GameImpact positionImpact="1" category="Offense" />
          <GameImpact positionImpact="-1" category="Defense" />
        </View>
      </View>
    )
  }
}

export default GameImpactRow

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  header: {
    color: UniversalStyles.colors.grey,
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 15,
  },
  impacts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
