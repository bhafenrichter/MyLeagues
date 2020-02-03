import React, { Component } from 'react';
import { Text, SafeAreaView, RefreshControl, StyleSheet, ScrollView } from 'react-native';
import RecentGames from '../components/Modules/RecentGames';
import LeagueList from '../components/Modules/LeagueList';
import ViewGame from '../components/Modules/ViewGame';
import AddGame from '../components/Modules/AddGame';

import UniversalStyles from './../utils/UniversalStyles';
import LeagueAPI from './../Data/LeaguesAPI';
import CacheHelper from './../utils/CacheHelper';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      leagues: [],
      currentUser: {},
    };

    // get the current user
    CacheHelper.get(CacheHelper.CURRENTUSER).then((cachedUser) => {
      if (cachedUser) {
        this.setState({currentUser: cachedUser});
        return cachedUser;
      } else {
        return LeagueAPI.getUser('oeCzlQS1DUSlfqai4HAP').then((response) => {
          console.log(response.data());
          CacheHelper.set(CacheHelper.CURRENTUSER, response.data());
          this.setState({currentUser: response});
          return response;
        }); 
      }
    }).then((user) => {
      // get the current user's leagues
      CacheHelper.get(CacheHelper.LEAGUES).then((cachedLeagues) => {
        if (cachedLeagues) {
          this.setState({leagues: cachedLeagues});
        } else {
          LeagueAPI.getLeagues(user.id).then((response) => {
            CacheHelper.set(CacheHelper.LEAGUES, response);
            this.setState({leagues: response});
          }); 
        }
      });
    });
  }

  onRefresh = () => {
    LeagueAPI.getLeagues(1).then((response) => {
      CacheHelper.set(CacheHelper.LEAGUES, response);
      this.setState({
        leagues: response,
      });
    });  
  }

  render() {
    const {leagues, refreshing} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ViewGame />
        <AddGame />
        {/* <AddPlayer /> */}
        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
          }
          >

          <Text style={styles.headerText}>MyLeagues</Text>
          <RecentGames scrollType="horizontal" title="Recent Games" />
          <LeagueList leagues={leagues} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 64,
    marginTop: 20,
    marginBottom: 40,
    color: UniversalStyles.colors.grey,
  }
});