import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'

import StandingsRow from '../Standings/StandingsRow'
import StandingsHeaderRow from '../Standings/StandingsHeaderRow'
import PlusButton from "./../Common/PlusButton"

export class Standings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Standings</Text>
          <PlusButton onPress={() => {}} />
        </View>
        <StandingsHeaderRow />
        <StandingsRow name="B. Horncastle" wins="8" losses="7" />
        <StandingsRow name="B. Hafenrichter" wins="3" losses="7" />
        <StandingsRow name="B. Haf" wins="3" losses="7" />
        <StandingsRow name="G. Lehman" wins="1" losses="7" />
        <StandingsRow name="C. Belman" wins="3" losses="0" />
      </View>
    )
  }
}

export default Standings

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
