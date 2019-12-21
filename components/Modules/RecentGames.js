import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

import GameTile from './../Game/GameTile'
import PlusButton from "./../Common/PlusButton"

import LeagueAPI from './../../Data/LeaguesAPI'

export class RecentGames extends Component {
  getRecentGames() {
    return LeagueAPI.getRecentGames(0);
  }

  render() {
    var recentGames = this.getRecentGames();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Recent Games</Text>
          <PlusButton onPress={() => {}} />
        </View>
        <View >
          <FlatList 
            data={recentGames} 
            renderItem={({item}) => <GameTile game={item} />} 
            keyExtractor={item => item.id}
            horizontal={true}
            ItemSeparatorComponent={ () => <View style={styles.separator} />}
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
    marginBottom: 30,
  },
  headerText: {
    fontSize: 36,
  },
  container: {
    marginTop: 15,
    flex: 1,
  }
})