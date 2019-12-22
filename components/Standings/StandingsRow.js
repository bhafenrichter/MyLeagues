import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ProfilePicture from '../Common/ProfilePicture'

const StandingsRow = (props) => {
  const {name, wins, losses} = props;

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfilePicture />
        <Text style={[styles.profileText, styles.text]}>{name}</Text>
      </View>

      <Text style={styles.text}>{wins}</Text>
      <Text style={styles.text}>{losses}</Text>
    </View>
  )
}

export default StandingsRow

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  profileContainer: {
    flexDirection: 'row',
  },
  profileText: {
    paddingLeft: 15,
    width: 150,
  },
  text: {
    fontSize: 21,
  }
});
