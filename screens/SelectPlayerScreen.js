import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation'

import ProfileIcon from './../components/Common/ProfileIcon';
import Utils from '../utils/Utils';

class SelectPlayer extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Select Player'
    };
	};
	
  constructor(props) {
		super(props);
    this.state = {
			url: '',
			name: '',
			isLoading: false,
		};
  }

  render() {
    const {members, callback} = this.props.navigation.state.params;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.results}>
            <ScrollView>
              <FlatList
                style={styles.list}
                data={members}
                renderItem={({item, index}) => (
                  <View style={styles.itemWrapper}>
                    <ProfileIcon url={item.profilePicture} size={70} name={ Utils.getDisplayName(item.firstName, item.lastName)} callback={() => {callback(item); navigation.goBack(); }}  />
                  </View>
                )}
                keyExtractor={item => item.id}
                numColumns={4}
                />
            </ScrollView>
        </View>
      </View>
    );
  }
}

export default withNavigation(SelectPlayer);

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 20,
	},
	scroll: {
		flexWrap: "wrap",
		flexDirection: 'row',

	},
	text: {
		textAlign: 'center',
		paddingTop: 20,
		fontSize: 24,
	},
	modal: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	column: {
		padding: 10,
	}
})