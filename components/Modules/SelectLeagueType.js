import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ScrollView, TextInput, FlatList } from 'react-native-gesture-handler';

import LeagueType from './LeagueType';


import LeagueAPI from './../../Data/LeaguesAPI';
import UniversalStyles from './../../utils/UniversalStyles';

class SelectLeagueType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      count: '',
      searchText: '',
      searchResults: [],
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
      leagueSelected: false,
    });
  }; 

  selectLeague = (id, title, count) => {
    this.setState({
      title: title,
      count: count,
      id: id,
      leagueSelected: true,
    });
  };

  deselectLeague = () => {
    this.setState({
      title: null,
      count: null,
      id: null,
      leagueSelected: false,
    });
  };

  render() {
    const {title, count, id, searchText, searchResults, isSearching, leagueSelected} = this.state;
    return (
      <View style={styles.container}>
        {
          !leagueSelected ? 
          (        
          <TextInput 
            style={[UniversalStyles.styles.input, styles.searchText]} 
            value={searchText} 
            placeholder="Search for League..."
            onChangeText={(text) => {this.search(text);}} />
            )
          : (
            <View style={styles.selectedLeague}>
              <LeagueType id={id} title={title} count={count} onPress={this.deselectLeague} />
            </View>
          )
        }

        <View style={(searchResults.length === 0 ? styles.leaguetype : {})}>
          {!leagueSelected ? 
          (
            <ScrollView contentContainerStyle={styles.scroll}>
              {!isSearching ? 
              (
                <FlatList 
                  contentContainerStyle={styles.flatlist}
                  data={searchResults} 
                  renderItem={({item}) => <LeagueType id={item.id} title={item.name} count={item.count} onPress={this.selectLeague} />}
                  keyExtractor={(item) => item.id} />
              ) : (
                <ActivityIndicator />
              )}
            </ScrollView>
          ): (
            <View></View>
          )}
        </View>
      </View>
    );
  }
}
export default SelectLeagueType;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
		padding: 30,
	},
	modalContainer: {
  },
  searchText: {
    width: '50%',
    borderBottomColor: UniversalStyles.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 18,
  },
	scroll: {
		flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedLeague: {
		flexDirection: 'row',
    justifyContent: 'center',
  },  
  leaguetype: {
    height: 0,
  }
});
