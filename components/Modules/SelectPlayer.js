import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
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
				<View style={styles.modalContainer}>
					<Modal style={styles.modal}>
						<ScrollView contentContainerStyle={styles.scroll}>
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
							<ProfileIcon callback={this.selectPlayer} />
						</ScrollView>
					</Modal>
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
	modalContainer: {
		margin: 50,
	},
	scroll: {
		flexWrap: "wrap",
		flexDirection: 'row',
		justifyContent: 'center',

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