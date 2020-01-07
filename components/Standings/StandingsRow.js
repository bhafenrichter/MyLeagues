import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'


import ProfilePicture from '../Common/ProfilePicture'
import UniversalStyles from './../../utils/UniversalStyles';

const StandingsRow = (props) => {
  const {name, wins, losses, navigation} = props;

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('Profile')}}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <ProfilePicture />
          <Text style={[styles.profileText, styles.text]}>{name}</Text>
        </View>

        <Text style={styles.text}>{wins}</Text>
        <Text style={styles.text}>{losses}</Text>
      </View>
    </TouchableOpacity>
    
  )
}

export default withNavigation(StandingsRow)

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: UniversalStyles.colors.grey,
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
