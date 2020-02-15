import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ProfileIcon from './../components/Common/ProfileIcon';

import { TextInput } from 'react-native-gesture-handler';

import UniversalStyles from './../utils/UniversalStyles';
import Utils from './../utils/Utils';
import LeaguesAPI from './../Data/LeaguesAPI';

import LoadingButton from './../components/Common/LoadingButton';

import { withNavigation } from 'react-navigation';

export class AddGameScreen extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
			url: '',
      name: '',
      isSelectPlayerVisible: false,
      selectedPlayer: {},
      currentUser: {},
    };

    const {members} = this.props.navigation.state.params;
    const currentUser = Utils.getCurrentLeagueUser(members).then((user) => {
      this.setState({currentUser: user});
    });
  }

  selectPlayer = (user) => {
    this.setState(
      { 
        isSelectPlayerVisible: false,
        selectedPlayer: user,
      }
    );
  }

  updateScore = (textbox, score) => {
    if (textbox === 'user') {
      this.setState({
        userScore: score,
      });
    } else {
      this.setState({
        opponentScore: score,
      });
    }
  }

  submitGame = (leagueid, userid, opponentid, homeScore, awayScore) => {
    return LeaguesAPI.createGame(leagueid, userid, opponentid, homeScore, awayScore);
  }

  render() {
    const {userScore, opponentScore, selectedPlayer, currentUser} = this.state;
    const {members, leagueId} = this.props.navigation.state.params;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.matchup}>
          <View style={styles.matchupColumn}>
            <ProfileIcon size={125} showCaption={false} url={currentUser.profilePicture} />
            <Text style={styles.text}>{Utils.getDisplayName(currentUser.firstName, currentUser.lastName)}</Text>
            <TextInput keyboardType="number-pad" value={userScore} onChangeText={(text) => {this.updateScore('user', text) }} style={[UniversalStyles.styles.input, styles.textbox]} />
          </View>
          <View style={styles.versusColumn}>
            <Text style={styles.versus}>Vs.</Text>
          </View>
          <View style={styles.matchupColumn}>
            <ProfileIcon size={125} showCaption={false} callback={() => { navigation.navigate('SelectPlayer', {callback: this.selectPlayer, members: members}); }} />
            {selectedPlayer ? (
              <Text style={styles.text}>{Utils.getDisplayName(selectedPlayer.firstName, selectedPlayer.lastName)}</Text>
            ) : (
              <View></View>
            )}
            <TextInput keyboardType="number-pad" value={opponentScore} onChangeText={(text) => {this.updateScore('opponent', text) }} style={[UniversalStyles.styles.input, styles.textbox]} />
          </View>
        </View>
        <View style={styles.footer}>
          <LoadingButton onSubmit={() => this.submitGame(leagueId, currentUser.id, selectedPlayer.id, userScore, opponentScore)} onComplete={() => navigation.goBack()} title="Create" />
        </View>
      </View>

    )
  }
}

export default withNavigation(AddGameScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  }, 
  matchup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  matchupColumn: {
    flexDirection: 'column',
  },
  versusColumn: {
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    padding: 10,
  },
  textbox: {
    textAlign: 'center',
    fontSize: 36,
    borderBottomColor: UniversalStyles.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 75,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  versus: {
    color: UniversalStyles.colors.grey,
    textAlign: 'center',
  },
  button: {
    borderRadius: 15,
  }
});
