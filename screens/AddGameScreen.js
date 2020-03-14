import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ProfileIcon from './../components/Common/ProfileIcon';

import { TextInput } from 'react-native-gesture-handler';
import { ToastAndroid } from 'react-native';

import UniversalStyles from './../utils/UniversalStyles';
import Utils from './../utils/Utils';
import LeaguesAPI from './../Data/LeaguesAPI';

import LoadingButton from './../components/Common/LoadingButton';

import { withNavigation } from 'react-navigation';

export class AddGameScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Game'
    };
	};

  constructor(props) {
    super(props);
    
    this.state = {
			url: '',
      name: '',
      isSelectPlayerVisible: false,
      selectedPlayer: {},
      currentUser: {},
      currentLeagueUser: {},
      selectableMembers: [],
    };

    const {members} = this.props.navigation.state.params;
    
    Utils.getCurrentLeagueUser(members).then((user) => {
      this.setState({currentLeagueUser: user});
      // remove self from members list
      this.setState({selectableMembers: members.filter((member) => { return member.id !== user.id }) });
    });

    Utils.getCurrentUser().then((user) => {
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
    if(!opponentid || !homeScore || !awayScore) {
      ToastAndroid.show('Please fill in all input fields.', ToastAndroid.SHORT);
      return new Promise((resolve, reject) => { resolve(false); });
    }

    return LeaguesAPI.createGame(leagueid, userid, opponentid, homeScore, awayScore);
  }

  onComplete = (status) => {
    const {navigation} = this.props;
    
    if (status !== false) {
      navigation.goBack(); 
    }
  }

  render() {
    const {userScore, opponentScore, selectedPlayer, currentUser, currentLeagueUser, selectableMembers} = this.state;
    const {leagueId} = this.props.navigation.state.params;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.matchup}>
          <View style={styles.matchupColumn}>
            <ProfileIcon size={125} showCaption={false} url={currentLeagueUser ? currentLeagueUser.profilePicture : ''} />
            <Text style={styles.text}>{Utils.getDisplayName(currentUser.firstName, currentUser.lastName)}</Text>
            <TextInput keyboardType="number-pad" value={userScore} onChangeText={(text) => {this.updateScore('user', text) }} style={[UniversalStyles.styles.input, styles.textbox]} />
          </View>
          <View style={styles.versusColumn}>
            <Text style={styles.versus}>Vs.</Text>
          </View>
          <View style={styles.matchupColumn}>
            <ProfileIcon url={selectedPlayer.profilePicture} size={125} showCaption={false} callback={() => { navigation.navigate('SelectPlayer', {callback: this.selectPlayer, members: selectableMembers}); }} />
            {selectedPlayer ? (
              <Text style={styles.text}>{Utils.getDisplayName(selectedPlayer.firstName, selectedPlayer.lastName)}</Text>
            ) : (
              <View></View>
            )}
            <TextInput keyboardType="number-pad" value={opponentScore} onChangeText={(text) => {this.updateScore('opponent', text) }} style={[UniversalStyles.styles.input, styles.textbox]} />
          </View>
        </View>
        <View style={styles.footer}>
          <LoadingButton onSubmit={() => this.submitGame(leagueId, currentLeagueUser.id, selectedPlayer.id, userScore, opponentScore)} onComplete={(status) => { this.onComplete(status); }} title="Create" />
        </View>
      </View>

    )
  }
}

export default withNavigation(AddGameScreen)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
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
