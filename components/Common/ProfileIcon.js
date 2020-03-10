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
		url: PropTypes.string,
	}

	static defaultProps = {
		size: 75,
		showCaption: true,
		url: 'https://via.placeholder.com/150x150',
	}

	selectProfile = (name, url) => {
		const {callback} = this.props;
		if (callback) {
			callback(name, url);
		}

	}

	render() {
		const {size, showCaption, name, url} = this.props;

		const styles = StyleSheet.create({
			container: {
				flexDirection: 'column',
				padding: 10,
			},
			image: {
				width: size, 
				height: size,
			},
			text: {
				marginTop: 10,
				color: 'purple',
				textAlign: 'center',
				flexWrap: "wrap",
				width: size,
			}
		});

		const player = {
			name: name ? name : 'no name',
			url: url,
		}
		return (
			<TouchableOpacity style={styles.container} onPress={() => {this.selectProfile(player.name, player.url)}}>
				<ProfilePicture style={styles.image} url={url} />
				{showCaption ? 
					(<Text style={styles.text}>{name}</Text>) : (<View></View>)
				}
				
			</TouchableOpacity>
    )
	}
}

export default ProfileIcon;