import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import UploadImage from '../components/Modules/UploadImage'

export class CreateLeagueScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <UploadImage />
      </View>
    )
  }
}

export default CreateLeagueScreen

const styles = StyleSheet.create({
  container: {

  }
});