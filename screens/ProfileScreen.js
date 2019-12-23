import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import RecentGames from './../components/Modules/RecentGames'
import BarRanking from '../components/Common/BarRanking'
import { ScrollView } from 'react-native-gesture-handler'
import MyPieChart from '../components/Common/MyPieChart'

export class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Brandon Hafenrichter</Text>
          </View>
          <View>
            <RecentGames scrollType="horizontal" title="Recent Games" />
          </View>
          <View style={styles.rankings}>
            <BarRanking />
            <BarRanking />
          </View>
          <View>
            <RecentGames scrollType="horizontal" title="Your Games" />
          </View>
          <View>
            <MyPieChart />
          </View>
        </ScrollView>        
      </View>
    )
  }
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  header: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  headerText: {
    fontSize: 54,
  }, 
  rankings: {
    paddingTop: 25,
    paddingBottom: 25,
  }
});