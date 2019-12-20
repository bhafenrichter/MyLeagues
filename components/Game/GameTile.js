import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import GameTileRow from './GameTileRow';

export class GameTile extends Component {
  render() {
    const {game} = this.props;
    return (
        <View style={styles.container}>
          <Text style={styles.league}>{game.league}</Text>
          <GameTileRow name={game.homeTeam} score={game.homeScore} />
          <GameTileRow name={game.awayTeam} score={game.awayScore} />
          <Text style={styles.league}>{game.createdOn}</Text>
        </View>
    )
  }
}

export default GameTile

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
  },
  league: {
    textAlign: "center",
    padding: 5,
  }
})