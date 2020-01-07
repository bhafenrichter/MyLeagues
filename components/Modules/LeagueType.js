import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import UniversalStyles from './../../utils/UniversalStyles'
import MyImage from '../Common/MyImage'



const LeagueType = (props) => {
  const {title, count, isEmpty, onPress, id} = props;

  const triggerCallback = (id, title, count) => {
    onPress(id, title, count);
  }

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}> 
          <Text style={styles.emptyText}>Press to select League Type...</Text>
          <Ionicons name="ios-arrow-round-forward" size={32} />
        </View>
      </View>
    )
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={() => {triggerCallback(id, title, count); }}>
        <View style={styles.leftContent}>
          <MyImage style={{width: 75, height: 75}} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.subtext}>{count ? count + ' Leagues' : ''}</Text>
          </View>
        </View>
        <View>
          <Ionicons name="ios-arrow-round-forward" size={32} />
        </View>
      </TouchableOpacity>
    )
  }

}

export default LeagueType

LeagueType.propTypes = {
  name: PropTypes.string,
  count: PropTypes.string,
  isEmpty: PropTypes.bool,
  callback: PropTypes.func,
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 30,
  },
  textContainer: {
    padding: 15,
  }, 
  leftContent: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  }, 
  emptyText: {
    fontSize: 18,
    color: UniversalStyles.colors.grey,
  },
  subtext: {
    fontSize: 12,
    color: UniversalStyles.colors.grey,
  },
});