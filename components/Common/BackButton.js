import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const BackButton = (props) => {
  const {onPress} = props;
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={onPress}>
        <Ionicons name="ios-arrow-round-back" size={32} />
      </TouchableOpacity>
    </View>
  )
}

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton

const styles = StyleSheet.create({
  backButton: {
    borderRadius: 50,
    backgroundColor: 'grey',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    bottom: 30,
    left: 30,
    zIndex: 100,
  }
});
