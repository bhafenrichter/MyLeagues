import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, RefreshControl, SafeAreaView } from 'react-native'

import RecentGames from '../components/Modules/RecentGames';
import Standings from '../components/Modules/Standings';
import UniversalStyles from './../utils/UniversalStyles';

import LeagueAPI from './../Data/LeaguesAPI';
import CacheHelper from '../utils/CacheHelper';

export class LeagueScreen extends Component {
  constructor(props) {
    super(props);

    const {league} = this.props.navigation.state.params;

    this.state = {
      league: {},
      refreshing: false,
      games: league.games,
    }
  }

  onRefresh = () => {
    const {league} = this.props.navigation.state.params;
    LeagueAPI.getLeagueGames(league.id).then((response) => {
      this.setState({ games: response });
    });  
  }

  render() {
    const {league} = this.props.navigation.state.params;
    const {refreshing, games} = this.state;
    const {members} = league;

    return (
        <SafeAreaView style={styles.container}>
          <Image source={{uri: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg'}} style={styles.backgroundImage} blurRadius={2} />
          <ScrollView 
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            <Text style={styles.headerText}>{league.name}</Text>
            <View style={styles.module}>
              <RecentGames games={games} leagueUsers={members} scrollType="vertical" title="Recent Games" leagueId={league.id} />
            </View>

            <View style={styles.module}>
              <Standings members={members} leagueId={league.id} />
            </View>          
          </ScrollView>
        </SafeAreaView>        
     

    )
  }
}

export default LeagueScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  module: {
    marginTop: 20,
    marginBottom: 40,
  },
  backgroundImage: {
    opacity: 0.3,
    width: Dimensions.get('window').width,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerText: {
    fontSize: 64,
    color: UniversalStyles.colors.grey,
  },
  secondaryText: {
    fontSize: 36,
    marginBottom: 30,
  }
});