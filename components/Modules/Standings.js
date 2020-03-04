import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import Utils from './../../utils/Utils';

import StandingsRow from '../Standings/StandingsRow'
import StandingsHeaderRow from '../Standings/StandingsHeaderRow'
import PlusButton from "./../Common/PlusButton"
import { FlatList } from 'react-native-gesture-handler'


export class Standings extends Component {
  render() {
    const {navigation, members, leagueId} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Standings</Text>
          <PlusButton onPress={() => {navigation.navigate('AddPlayer', {leagueId: leagueId})}} />
        </View>

        <StandingsHeaderRow name="" wins="W" losses="L" />
        <FlatList 
          data={members}
          keyExtractor={item => item.id} 
          renderItem={({item}) => 
            <StandingsRow name={Utils.getDisplayName(item.firstName, item.lastName)} wins={item.wins} losses={item.losses} profilePicture={item.profilePicture} />} 
          />
      </View>
    )
  }
}

export default withNavigation(Standings)

const styles = StyleSheet.create({
  container: {

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 36,
  },
});
