import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import GameTileRow from './GameTileRow';
import { EventBus, Events } from "./../../utils/EventBus";

export class GameTile extends Component {

  componentDidMount() {
  }

  viewGame = (game) => {
    EventBus.trigger(Events.VIEW_GAME, game);
  }

  render() {
    const {game, scrollType} = this.props;
    return (
        <TouchableOpacity onPress={() => {this.viewGame(game)}}>
          <View style={styles.container}>
            <Text style={styles.league}>{game.league}</Text>
            <GameTileRow 
              isWin={game.homeScore > game.awayScore}
              name={game.homeTeam} 
              score={game.homeScore} 
              showName={scrollType === 'vertical'} />
            <GameTileRow 
              isWin={game.awayScore > game.homeScore}
              name={game.awayTeam} 
              score={game.awayScore} 
              showName={scrollType === 'vertical'} />
            <Text style={styles.league}>{game.createdOn}</Text>
          </View>
        </TouchableOpacity>
    )
  }
}

export default GameTile

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    alignContent: "center",
    backgroundColor: 'white',
  },
  league: {
    textAlign: "center",
    padding: 5,
  }
})