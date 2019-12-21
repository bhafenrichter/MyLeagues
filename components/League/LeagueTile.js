import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

import FriendsListed from './../Common/FriendsListed'
import MyImage from '../Common/MyImage'

export class LeagueTile extends Component {
  render() {
    const {league, navigation} = this.props;

    return (
      <TouchableOpacity onPress={ () => navigation.navigate('League', {league: league})}>
        <View style={styles.container}>
          <View>
            <MyImage style={styles.image} />
          </View>
          <View>
            <Text style={styles.league}>{league.name}</Text>
            <FriendsListed friendsList={league.friends} />
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
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    padding: padding,
    marginBottom: padding / 4,
    marginTop: padding / 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: Dimensions.get('window').width - padding,
  },
  league: {
    fontSize: 24,
    marginBottom: 10,
  },
  image: {
    width: 72,
    height: 72,
  }
});
