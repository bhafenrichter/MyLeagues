import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyImage from '../Common/MyImage'

const StandingsHeaderRow = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MyImage style={{width: 25, height: 25, opacity: 0}} />
        <Text style={[styles.profileText, styles.text]}></Text>
      </View>
      <Text style={styles.text}>W</Text>
      <Text style={styles.text}>L</Text>
    </View>
  )
}

export default StandingsHeaderRow

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  }, 
  profileText: {
    paddingLeft: 10,
    width: 150,
  },
  text: {
    backgroundColor: 'red',
    fontSize: 18,
  }
});
