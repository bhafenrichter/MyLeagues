import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import MyImage from '../Common/MyImage';

import UniversalStyles from './../../utils/UniversalStyles';

class SelectPlayer extends Component {
  constructor(props) {
		super(props);
    this.state = {
			url: '',
			name: '',
			isLoading: false,
		};
  }

	selectPlayer = (name, url) => {
		const {callback} = this.props;

		this.setState(
			{
				isVisible: false,
				url: url,
				name: name,
			}
		);
		callback(name, url);
	}

  render() {
		const {isVisible, isLoading, url, name} = this.state;
		const {players} = this.props;

		if (isVisible) {
			return (
				<View style={styles.absoluteContainer}>
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
									data={players}
									renderItem={({item, index}) => (
										<View style={styles.itemWrapper}>
											<TouchableOpacity onPress={() => {this.selectUser(index)}} style={[item.toggled ? styles.toggled : {}, styles.item]}>
												<ProfileIcon size={70} />
											</TouchableOpacity>
										</View>
	
									)}
									
									keyExtractor={item => item.id}
									numColumns={4}
									/>
							</ScrollView>
						)}
	
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<MyImage url={url} onPressImage={() => { this.setState({isVisible: true}); }} style={{height: 125, width: 125,}} />
					<Text style={styles.text}>{name}</Text>
				</View>
			);
		
		}
  
  }
}

export default SelectPlayer;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 10,
	},
	absoluteContainer: {
		position: 'absolute',
		height: 200,
		width: 200,
		top: 0,
		left: 0,
		backgroundColor: 'white',
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