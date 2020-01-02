import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import UniversalStyles from "./../../utils/UniversalStyles";

const BarRanking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Offense</Text>
      <View>
        <View style={[styles.bar, styles.outer]}></View>
        <View style={[styles.bar, styles.inner]}>
          <Text style={styles.text}>2nd</Text>
        </View>
      </View>
      
    </View>
  )
}

export default BarRanking

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  bar: {
    borderRadius: 15,
    position: "absolute",
  }, 
  outer: {
    backgroundColor: UniversalStyles.colors.grey,
    width: '100%',
    height: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: UniversalStyles.colors.grey,
  },
  inner: {
    backgroundColor: 'red',
    width: '50%',
    height: 25,
  },
  header: {
    color: 'black',
    marginBottom: 5,
  },
  text: {
    color: 'white',
    marginTop: 5,
    marginLeft: 15,
  }
})