import React from 'react'

import MyImage from './MyImage';

const ProfilePicture = () => {
  const id = getRandomInt(70);
  return (
    <MyImage width={28} height={28} url={"https://i.pravatar.cc/36?img=" + id} />
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default ProfilePicture
