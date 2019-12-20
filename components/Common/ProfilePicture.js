import React from 'react'
import PropTypes from 'prop-types'

import MyImage from './MyImage'
import { StyleSheet } from 'react-native';


const ProfilePicture = (props) => {
  // prepare styling
  const {style} = props;
  const defaultStyle = StyleSheet.create({
    default: {
      width: 28,
      height: 28,
    }
  });
  const picStyle = [defaultStyle.default, style];

  // pick a random picture
  const id = getRandomInt(70);

  return (
    <MyImage url={"https://i.pravatar.cc/36?img=" + id} style={picStyle} />
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

ProfilePicture.propTypes = {
  style: PropTypes.style,
};

export default ProfilePicture
