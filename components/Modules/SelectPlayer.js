import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyImage from '../Common/MyImage';
import ProfileIcon from '../Common/ProfileIcon';
import { ScrollView } from 'react-native-gesture-handler';

class SelectPlayer extends Component {
  constructor(props) {
		super(props);
    this.state = {
			isVisible: this.props.isVisible,
			url: '',
			name: '',
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
		const {isVisible, url, name} = this.state;

		if (isVisible) {
			return (
				<View style={styles.absoluteContainer}>
					<ScrollView horizontal={true} style={{height: 300}}>
						<View style={styles.column}>
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
						</View>
						<View style={styles.column}>
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
						</View>
						<View style={styles.column}>
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
						</View>
						<View style={styles.column}>
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
						</View>
					</ScrollView>
				
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
	},
	text: {
		textAlign: 'center',
		padding: 10,
		fontSize: 24,
	},
	absoluteContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		width: '100%',
		height: 300,
		backgroundColor: 'white',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	column: {
		padding: 10,
	}
})