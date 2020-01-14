import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import ProfilePicture from "./../Common/ProfilePicture";

const NAMES_IN_LIST = 3;

const FriendsListed = (props) => {
  const {friends} = props;
  let friendsListed = [];
  let friendsList = '';
  let profilePictures = [];

  if (friends.length > 0) {
    for (var i = 0; i < NAMES_IN_LIST; i++) {
      if (friends.length > i) {
        friendsListed.push(friends[i].name.split(' ')[0]);
        profilePictures.push(<ProfilePicture style={{position: 'absolute', top: 0, left: i * 15,}} />);
      }      
    }
  }
  friendsList = friendsListed.join(', ');
  if (friends.length > NAMES_IN_LIST) {
    friendsList += ' and ' + ((friendsListed.length + 1) - NAMES_IN_LIST) + ' more...';
  }

  return (
    <View style={styles.container}>
      <View style={styles.pictures}>
        {profilePictures}
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{friendsList}</Text>
      </View>
    </View>
  )
}

FriendsListed.propTypes = {
  friends: PropTypes.array.isRequired,
}

FriendsListed.defaultProps = {
  friends: [],
}

export default FriendsListed


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  pictures: {
    flexDirection: 'row',
    width: 45,
    height: 20,
    marginRight: 10,
    marginTop: 10,
  },
  picture: {
  },
  textWrapper: {
    marginLeft: 15,
  },
  text: {
    fontSize: 10,
  }
});
