import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native'

import PlusButton from "./../Common/PlusButton"
import LeagueTile from "./../League/LeagueTile"

import { withNavigation } from 'react-navigation'

export class LeagueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {navigation, leagues} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Leagues</Text>
          <PlusButton onPress={ () => navigation.navigate('CreateLeague', {})} />
        </View>
        <SafeAreaView style={styles.leagueList}>
          <FlatList 
            style={styles.list} 
            data={leagues} 
            renderItem={({item}) => <LeagueTile league={item} />} 
            keyExtractor={item => item.id} 
            scrollEnabled={false} 
            />
        </SafeAreaView>
      </View>
    )
  }
}

export default withNavigation(LeagueList)

const styles = StyleSheet.create({
  leagueList: {
  },
  league: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 36,
  },
  container: {
    marginTop: 25,
    flex: 1,
  }
})