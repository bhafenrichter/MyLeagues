import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


class AddPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput title="Search for Player..." />
      </View>
    );
  }
}

export default AddPlayerScreen;

const styles = StyleSheet.create({
  container: {

  }
})