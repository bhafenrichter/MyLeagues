import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, Dimensions, RefreshControl, SafeAreaView } from 'react-native'

import RecentGames from '../components/Modules/RecentGames';
import Standings from '../components/Modules/Standings';
import UniversalStyles from './../utils/UniversalStyles';

import LeagueAPI from './../Data/LeaguesAPI';
import CacheHelper from '../utils/CacheHelper';
import Utils from './../utils/Utils';

export class LeagueScreen extends Component {
  constructor(props) {
    super(props);

    const {leagueid} = this.props.navigation.state.params;
    CacheHelper.get(CacheHelper.LEAGUES).then((leagues) => {
      for (var i = 0; i < leagues.length; i++) {
        if (leagues[i].id === leagueid) {
          this.setState({
            league: leagues[i],
            games: leagues[i].games,
            members: leagues[i].members,
          });
        }
      }
    })
    this.state = {
      league: {},
      refreshing: false,
      games: [],
      members: [],
    }
  }
  
  // static navigationOptions = ({ navigation }) => {
  //   const title = this.state.league ? this.state.league.name : '';
  //   return {
  //     title: title
  //   };
  // };

  onRefresh = async () => {
    const {leagueid} = this.props.navigation.state.params;
    
    let refreshedLeague = {};
    await LeagueAPI.getLeague(leagueid, true).then((response) => {
      this.setState({ league: response });
      refreshedLeague = response;
    });

    await LeagueAPI.getMembersForLeague(leagueid).then((response) => {
      this.setState({ members: response });
      refreshedLeague.members = response;
    });

    await LeagueAPI.getLeagueGames(refreshedLeague, true).then((response) => {
      this.setState({ games: response });
      refreshedLeague.games = response;
      Utils.saveLeague(refreshedLeague);
    });

    let savedLeagues = await CacheHelper.get(CacheHelper.LEAGUES);
    this.setState({league: refreshedLeague});
  
    for (var i = 0; i < savedLeagues.length; i++) {
      let current = savedLeagues[i];
      if (current.id === refreshedLeague.id) {
        savedLeagues[i] = refreshedLeague;
      }
    }

    CacheHelper.set(CacheHelper.LEAGUES, savedLeagues);
  }

  render() {
    const {leagueid} = this.props.navigation.state.params;
    const {refreshing, games, members} = this.state;

    return (
        <SafeAreaView style={styles.container}>
          <ScrollView 
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.module}>
              <RecentGames games={games} leagueUsers={members} scrollType="vertical" title="Recent Games" leagueId={leagueid} showAddGame={members.length > 1} />
            </View>

            <View style={styles.module}>
              <Standings members={members} leagueId={leagueid} />
            </View>          
          </ScrollView>
        </SafeAreaView>        
     

    )
  }
}

export default LeagueScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
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