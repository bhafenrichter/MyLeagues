import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

import FriendsListed from './../Common/FriendsListed'
import MyImage from '../Common/MyImage'
import UniversalStyles from "./../../utils/UniversalStyles";

export class LeagueTile extends Component {
  render() {
    const {league, navigation} = this.props;

    return (
      <TouchableOpacity onPress={ () => navigation.navigate('League', {leagueid: league.id})}>
        <View style={[UniversalStyles.styles.card, styles.container]}>
          <View>
            {/* <MyImage style={styles.image} /> */}
          </View>
          <View style={styles.information}>
            <Text style={styles.league}>{league.name}</Text>
            <Text style={styles.subtype}>{league.subtype}</Text>
            <FriendsListed friends={league.members} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(LeagueTile)

const padding = 20;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    padding: padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  league: {
    fontSize: 24,
  },
  image: {
    marginTop: 10,
    width: 72,
    height: 72,
  },
  information: {
    position: "relative",
    marginLeft: 20,
  },
  subtype: {
    fontSize: 12,
    color: UniversalStyles.colors.grey,
  }
});
