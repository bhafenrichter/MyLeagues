import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { withNavigation } from 'react-navigation';

import LoadingButton from './../components/Common/LoadingButton';
import UniversalStyles from './../utils/UniversalStyles';

import LeaguesAPI from './../Data/LeaguesAPI';

export class CreateLeagueScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create League'
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
    };
  }

  createLeague = () => {
    const {id, name} = this.state;
    return LeaguesAPI.createLeague(id, name).then((response) => {
      console.log('league created!');
    });
  }

  render() {
    const {name} = this.state;
    const {navigation} = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="height">
        {/* <UploadImage /> */}
        <TextInput 
          style={[styles.input, UniversalStyles.styles.input]} 
          value={name} 
          placeholder="League Name"
          onChangeText={(name) => this.setState({name})} />
        {/* <SelectLeagueType /> */}
        <LoadingButton style={UniversalStyles.button} title="Create" onSubmit={this.createLeague} onComplete={() => {navigation.goBack()}} />
      </KeyboardAvoidingView>
    )
  }
}

export default withNavigation(CreateLeagueScreen)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    marginTop: 30,
    textAlign: 'center',
    width: '50%',
    marginBottom: 30,
  }
});