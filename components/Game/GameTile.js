import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import GameTileRow from './GameTileRow';
import { EventBus, Events } from "./../../utils/EventBus";
import UniversalStyles from "./../../utils/UniversalStyles";
import Utils from '../../utils/Utils';
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
          <View style={[UniversalStyles.styles.card, styles.container]}>
            <Text style={styles.league}>{game.league}</Text>
            <GameTileRow 
              isWin={game.homeScore > game.awayScore}
              name={Utils.getDisplayName(game.homeProfile ? game.homeProfile.firstName : '', game.homeProfile ? game.homeProfile.lastName : '')} 
              score={game.homeScore} 
              showName={scrollType === 'vertical'} />
            <GameTileRow 
              isWin={game.awayScore > game.homeScore}
              name={Utils.getDisplayName(game.awayProfile ? game.awayProfile.firstName : '', game.awayProfile ? game.awayProfile.lastName : '')} 
              score={game.awayScore} 
              showName={scrollType === 'vertical'} />
            <Text style={styles.league}>{game.createdOn}</Text>
            <Text style={styles.league}>{Utils.getFirebaseDate(game.playedOn)}</Text>
          </View>
        </TouchableOpacity>
    )
  }
}

export default GameTile

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    alignContent: "center",
    backgroundColor: 'white',
    margin: 5,
  },
  league: {
    textAlign: "center",
    padding: 5,
  }
})