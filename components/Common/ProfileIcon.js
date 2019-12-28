import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ProfilePicture from './ProfilePicture'

import PropTypes from 'prop-types';

class ProfileIcon extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	static propTypes = {
		size: PropTypes.number,
		showCaption: PropTypes.bool,
	}

	static defaultProps = {
		size: 75,
		showCaption: true,
	}

	selectProfile = (name, url) => {
		const {callback} = this.props;
		callback(name, url);
	}

	render() {
		const {size, showCaption} = this.props;
		const player = {
			name: 'HAF',
			url: 'https://i.pravatar.cc/36?img=1',
		}
		return (
			<TouchableOpacity style={styles.container} onPress={() => {this.selectProfile(player.name, player.url)}}>
				<ProfilePicture style={{width: size, height: size}} />
				{showCaption ? 
					(<Text style={styles.text}>HAF</Text>) : (<View></View>)
				}
				
			</TouchableOpacity>
    )
	}
}

export default ProfileIcon;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		padding: 10,
	},
	text: {
		textAlign: 'center',
	}
});