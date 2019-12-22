import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import RecentGames from '../components/Modules/RecentGames';
import LeagueList from '../components/Modules/LeagueList';
import ViewGame from '../components/Modules/ViewGame';

import { EventBus, Events } from "./../utils/EventBus";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ViewGame />
        <ScrollView 
          showsVerticalScrollIndicator={false}>
          <Text style={styles.headerText}>MyLeagues</Text>
          <RecentGames scrollType="horizontal" />
          <LeagueList />
        </ScrollView>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerText: {
    fontSize: 64,
    marginTop: 20,
    marginBottom: 40,
    color: 'grey',
  }
});