import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

import FriendsListed from './../Common/FriendsListed'
import MyImage from '../Common/MyImage'

export class LeagueTile extends Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <View>
            <MyImage style={styles.image} />
          </View>
          <View>
            <Text style={styles.league}>Lorum Lipsem</Text>
            <FriendsListed friendsList="Brandon, Brian, and 4 more..." />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default LeagueTile

const padding = 20;
const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    padding: padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - padding,
  },
  league: {
    fontSize: 36,
    marginBottom: 10,
  },
  image: {
    width: 72,
    height: 72,
  }
});