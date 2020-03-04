import React, { Component } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Text, FlatList, ActivityIndicator } from 'react-native';

import UniversalStyles from '../utils/UniversalStyles';
import ProfileIcon from '../components/Common/ProfileIcon';
import FriendsListed from '../components/Common/FriendsListed';
import LoadingButton from '../components/Common/LoadingButton';

import LeaguesAPI from '../Data/LeaguesAPI';
import FacebookAPI from '../Data/FacebookAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'

class AddPlayerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      initialResults: [],
      searchResults: [],
      isLoading: false,
      selectedUsers: [],
    };
    
    // grab the friends from facebook
    FacebookAPI.getFriends((response) => {
      let friends = [];
      let facebookFriends = response && response.friends ? response.friends.data : [];
      if (response && response.friends) {
        for (let i = 0; i < facebookFriends.length; i++) {
          friends.push(facebookFriends[i]);
        }
      }
      this.setState({
        initialResults: friends,
        searchResults: friends,
      });
    });

    this.search();
  }

  addUsers = () => {
    const {selectedUsers} = this.state;
    const leagueId = this.props.navigation.getParam('leagueId', 0);

    return LeaguesAPI.addUsersToLeague(selectedUsers, leagueId).then((results) => {
      this.setState({
        isLoading: false,
      });
    });
  }

  search = (text) => {
    const { initialResults } = this.state;
    let searchResults;
    if (text !== '') {
      searchResults = initialResults.filter((result) => { return result.name.includes(text); });
    } else { 
      searchResults = initialResults;
    }

    this.setState({
      searchText: text,
      searchResults: searchResults,
    });
  }

  selectUser = (index) => {
    const {searchResults, selectedUsers} = this.state;
    const user = searchResults[index];
    user.toggled = !user.toggled;
    searchResults[index] = user;

    if (user.toggled) {
      selectedUsers.push(user);
    } else {
     for (var i = 0; i < selectedUsers.length; i++) {
       if(selectedUsers[i].id === user.id) {
         selectedUsers.splice(i, 1);
       }
     }
    }
    this.setState({
      searchResults: searchResults,
      selectedUsers: selectedUsers
    });
  }

  render() {
    const {navigation} = this.props;
    const {searchResults, isLoading, selectedUsers} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput 
            style={[styles.searchText, UniversalStyles.styles.input]} 
            onChangeText={this.search}
            placeholder="Search for Player..." />
        </View>
        <View style={styles.results}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView>
              <FlatList
                style={styles.list}
                data={searchResults}
                renderItem={({item, index}) => (
                  <View style={styles.itemWrapper}>
                    <TouchableOpacity onPress={() => {this.selectUser(index)}} style={[item.toggled ? styles.toggled : {}, styles.item]}>
                      <ProfileIcon size={60} showCaption={true} name={item.name} url={item.picture.data.url} />
                    </TouchableOpacity>
                  </View>

                )}
                
                keyExtractor={item => item.id}
                numColumns={4}
                />
            </ScrollView>
          )}

        </View>
        {selectedUsers.length > 0 ? (
          <View style={styles.footer}>
              <FriendsListed friends={selectedUsers} />
              <LoadingButton style={styles.addButton} title="Add" onSubmit={this.addUsers} onComplete={() => {navigation.goBack()}} />
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

export default withNavigation(AddPlayerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  searchText: {
    width: '75%',
  },
  results: {
    padding: 10,
    alignItems: 'center',
  },
  list: {
  },
  itemWrapper: {
    padding: 5,
  },
  item: {
  },
  footer: {
    width: '100%',
    backgroundColor: UniversalStyles.colors.grey,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  toggled: {
    borderColor: UniversalStyles.colors.grey,
    borderWidth: 1,
    borderRadius: 15,
  },
  addButton: {
  }
})