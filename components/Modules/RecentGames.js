import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'

import GameTile from './../Game/GameTile'
import PlusButton from "./../Common/PlusButton"

import { withNavigation } from 'react-navigation'

export class RecentGames extends Component {
  constructor(props) {
    super(props);
  }  

  async addGame() {
    const {leagueUsers, navigation, leagueId} = this.props;
    navigation.navigate('AddGame', {members: leagueUsers, leagueId: leagueId});
  }

  render() {
    const {games, title, scrollType, showAddGame} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          { showAddGame ? (
            <PlusButton onPress={() => this.addGame()} />
          ) : (
            <View></View>
          )}
          
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
        {
          games && games.length === 0 ? (
            <View>
              <Text style={styles.emptyText}>No games have been played yet.</Text>
            </View>
          ) : (
            <View></View>
          )
        }
      </View>
    )
  }
}

export default withNavigation(RecentGames)

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
  },
  emptyText: {
    textAlign: 'center',
  }
})