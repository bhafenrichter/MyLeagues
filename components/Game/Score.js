import React from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

const Score = (props) => {
  const {score, user, record} = props;

  return (
    <View>
      <ImageBackground source={{uri: 'https://via.placeholder.com/150x150'}} style={styles.container} resizeMode='cover' blurRadius={2}>
        <Text style={styles.score}>{score}</Text>
      </ImageBackground>
      <Text style={styles.user}>{user}</Text>
      <Text style={styles.record}>{record}</Text>
    </View>

  )
}

export default Score

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: 85,
    height: 85,
  },
  score: {
    fontSize: 72,
    textAlignVertical: "center",
    textAlign: "center",
  },
  user: {
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 18,
  },
  record: {
    fontSize: 12,
    textAlign: "center",
  }
});
