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

    this.state = {
      games: [],
      league: {},
      refreshing: false,
    }

    // get the members from the league list 
    LeagueAPI.getLeague(1).then((response) => {
      this.setState({
        league: response,
      });
    });

    // get the games from the api
    CacheHelper.get(CacheHelper.GAMES + '_1').then((response) => {
      if (response) {
        this.setState({games: response});
      } else {
        LeagueAPI.getLeagueGames(1).then((response) => {
          CacheHelper.set(CacheHelper.GAMES + '_1', response);
          this.setState({ games: response });
        });
      }
    });
  }

  onRefresh = () => {
    LeagueAPI.getLeagueGames(1).then((response) => {
      CacheHelper.set(CacheHelper.GAMES + '_1', response);
      this.setState({ games: response });
    });  
  }

  render() {
    const {league} = this.props.navigation.state.params;
    const {games, refreshing} = this.state;
  
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
              <RecentGames games={games} scrollType="vertical" title="Recent Games" />
            </View>

            <View style={styles.module}>
              <Standings members={league.members} />
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