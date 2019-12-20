import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProfilePicture from "./../Common/ProfilePicture";

const FriendsListed = (props) => {
  const {friendsList} = props;

  return (
    <View style={styles.container}>
      <View style={styles.pictures}>
        <ProfilePicture style={styles.picture} />
        <ProfilePicture style={styles.picture} />
        <ProfilePicture style={styles.picture} />
      </View>
      <View style={styles.text}>
        <Text>{friendsList}</Text>
      </View>
    </View>
  )
}

export default FriendsListed

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pictures: {
    flexDirection: 'row',
  },
  picture: {
  },
  text: {
    marginLeft: 15,
  }
});
