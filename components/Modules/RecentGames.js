import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

import GameTile from './../Game/GameTile'
import PlusButton from "./../Common/PlusButton"

import LeagueAPI from './../../Data/LeaguesAPI'

import {EventBus, Events} from './../../utils/EventBus';

export class RecentGames extends Component {
  constructor(props) {
    super(props);
  }  

  addGame() {
    EventBus.trigger(Events.ADD_GAME, {});
  }

  getRecentGames() {
    return LeagueAPI.getRecentGames(0);
  }

  render() {
    const {games, title, scrollType} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          <PlusButton onPress={() => this.addGame()} />
        </View>
        <View>
          <FlatList 
            style={styles.list}
            data={games} 
            renderItem={({item}) => <GameTile game={item} scrollType={scrollType} />} 
            keyExtractor={item => item.id}
            horizontal={scrollType === 'horizontal'}
            ItemSeparatorComponent={ () => <View style={styles.separator} />}
            showsHorizontalScrollIndicator={false}
            />
        </View>
      </View>
    )
  }
}

export default RecentGames

const styles = StyleSheet.create({
  separator: {
    padding: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 10,
  },
  list: {
    padding: 10,
  },
  headerText: {
    fontSize: 36,
  },
  container: {
  }
})