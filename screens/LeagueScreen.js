import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'

import RecentGames from '../components/Modules/RecentGames';
import Standings from '../components/Modules/Standings';

export class LeagueScreen extends Component {
  render() {
    const {league} = this.props.navigation.state.params;

    return (
        <View style={styles.container}>
          <Image source={{uri: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg'}} style={styles.backgroundImage} blurRadius={2} />
          <ScrollView 
            showsVerticalScrollIndicator={false}>
            <Text style={styles.headerText}>{league.name}</Text>
            <View style={styles.module}>
              <RecentGames scrollType="vertical" />
            </View>

            <View style={styles.module}>
              <Standings />
            </View>          
          </ScrollView>
        </View>        
     

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
    color: 'grey',
  },
  secondaryText: {
    fontSize: 36,
    marginBottom: 30,
  }
});