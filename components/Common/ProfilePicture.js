import React from 'react'
import PropTypes from 'prop-types'

import MyImage from './MyImage'
import { StyleSheet } from 'react-native';


const ProfilePicture = (props) => {
  // prepare styling
  const {style, url} = props;
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
    <MyImage url={url} style={picStyle} />
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

ProfilePicture.propTypes = {
  style: PropTypes.style,
  url: PropTypes.string,
};

ProfilePicture.defaultProps = {
  style: {},
  url: "https://i.pravatar.cc/36",
}

export default ProfilePicture
