import React, { Component } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput, FlatList } from 'react-native-gesture-handler';

import LeagueType from './LeagueType';
import BackButton from './../Common/BackButton';

import LeagueAPI from './../../Data/LeaguesAPI';

class SelectLeagueType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      title: '',
      count: '',
      searchText: '',
      searchResults: {},
      isSearching: false,
      id: '',
    };
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

  closeModal = () => {
    this.setState({isVisible: false});
  }

  selectLeague = (id, title, count) => {
    this.setState({
      title: title,
      count: count,
      id: id,
    });
    this.closeModal();
  }

  render() {
    const {isVisible, title, count, searchText, searchResults, isSearching} = this.state;

    if (!isVisible) {
      if (title !== '') {
        return (
          <View>
            <LeagueType title={title} count={count} onPress={() => {this.setState({isVisible: true}); }} />
          </View>
        )
      } else {
        return (
          <TouchableOpacity onPress={() => {this.setState({isVisible: true}); }}>
            <LeagueType isEmpty={true} />
          </TouchableOpacity>
        );
       
      }
      
    } else {
      return (
        <View style={styles.modalContainer}>
          <Modal style={styles.modal}>
            <View style={styles.container}>
              <TextInput 
                style={styles.searchText} 
                value={searchText} 
                placeholder="Search for League..."
                onChangeText={(text) => {this.search(text);}} />
              <ScrollView contentContainerStyle={styles.scroll}>
                {!isSearching ? 
                (
                  <FlatList 
                    data={searchResults} 
                    renderItem={({item}) => <LeagueType id={item.id} title={item.name} count={item.count} onPress={this.selectLeague} />}
                    keyExtractor={(item) => item.id} />
                ) : (
                  <ActivityIndicator />
                )}

              </ScrollView>
            </View>
            <BackButton onPress={() => {this.closeModal()}} />
          </Modal>
        </View>
      );
    }

  }
}

export default SelectLeagueType;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 30,
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