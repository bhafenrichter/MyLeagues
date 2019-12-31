import React, { Component } from 'react';
import { View, StyleSheet, Modal, TextInput, ScrollView, FlatList, ActivityIndicator, Button } from 'react-native';

import LeagueType from './LeagueType';

import LeagueAPI from './../../Data/LeaguesAPI';
import {EventBus, Events} from './../../utils/EventBus';

class SelectLeagueTypeSelector extends Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      searchText: '',
      searchResults: {},
      isSearching: false,
    };
    EventBus.subscribe(Events.SELECT_LEAGUETYPE, () => {
      this.setState({
        isVisible: true,
      });
    });
  }

  triggerCallback = (id, name, count) => {
    this.closeModal();
    EventBus.trigger(Events.SELECTED_LEAGUETYPE, {id, name, count});
  }

  closeModal = () => {
    this.setState({isVisible: false});
  }

  search(text) {
    this.setState({isSearching: true});
    const results = LeagueAPI.getLeaguesForSearch(text);
    this.setState({
      searchText: text,
      searchResults: results,
      isSearching: false,
    });
  }

  render() {
    const {searchText, searchResults, isSearching, isVisible} = this.state;
    if (isVisible) {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Button title="Back" style={styles.backButton} onPress={() => {this.triggerCallback(null, null, null)}} />
              <TextInput 
                style={styles.searchText} 
                value={searchText} 
                placeholder="Search for League..."
                onChangeText={(text) => {this.search(text);}} />
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
              {!isSearching ? 
              (
                <FlatList 
                  data={searchResults} 
                  renderItem={({item}) => <LeagueType id={item.id} title={item.name} count={item.count} onPress={this.triggerCallback} />}
                  keyExtractor={(item) => item.id} />
              ) : (
                <ActivityIndicator />
              )}
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return <View></View>
    }
  } 

}

export default SelectLeagueTypeSelector;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
    backgroundColor: 'white',
    minHeight: 200,
  },
  header: {
    flexDirection: 'row',
  },
  backButton: {
    paddingRight: 10,
  },
	modalContainer: {
  },
  searchText: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 18,
  },
	scroll: {
		flexWrap: "wrap",
		flexDirection: 'row',
    justifyContent: 'center',
  }, 
});