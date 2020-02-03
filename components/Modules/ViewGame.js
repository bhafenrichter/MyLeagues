import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

import Modal from "react-native-modal";
import Score from '../Game/Score';
import GameImpactRow from './GameImpactRow';
import UniversalStyles from './../../utils/UniversalStyles';

import { EventBus, Events } from "./../../utils/EventBus";
import Utils from './../../utils/Utils';

export class ViewGame extends Component {

  state = {
    isVisible: false,
    game: {},
  };

  componentDidMount = ()  => {
    EventBus.subscribe(Events.VIEW_GAME, (game) => {
      this.setState({
        isVisible: true,
        game: game,
      });
    });
  }

  closeModal = () => {
    this.setState({ isVisible: false });
  }

  render() {
    const {isVisible, game} = this.state;

    if (!game) {
      return <View></View>
    }
    
    return (
      <View style={styles.container}>
        <Modal 
          isVisible={isVisible}
          onBackdropPress={this.closeModal}
          onSwipeComplete={this.closeModal}
          swipeDirection={['up', 'down', 'left', 'right']}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <Score user={game.awayName} score={game.awayScore} record={game.awayRecord} />
              <View style={styles.details}>
                <Text style={styles.versus}>Vs.</Text>
                <Text style={styles.date}>{Utils.getFirebaseDate(game.playedOn)}</Text>
              </View>
              <Score user={game.homeName} score={game.homeScore} record={game.homeRecord} />
            </View>
            <GameImpactRow />
            <GameImpactRow />
            <View style={styles.footer}>
              <Button onPress={this.closeModal} title="Close" style={styles.button} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default ViewGame

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
  },
  button: {
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  details: {
    alignItems: 'center',

  },
  versus: {
    fontSize: 18,
  }, 
  date: {
    fontSize: 12,
    color: UniversalStyles.colors.grey,
  }
});
