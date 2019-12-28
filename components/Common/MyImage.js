import React, { Component } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'; 

export class MyImage extends Component {

	static propTypes = {
		url: PropTypes.string,
		onPressImage: PropTypes.func,
		style: PropTypes.style
	}

	static defaultProps = {
		onPressImage: null,
		url: '',
	}


	render() {
		const {url, onPressImage, style} = this.props;
		const styles = StyleSheet.create({
			container: {
				justifyContent: 'center',
			},
			default: {
				borderRadius: 15,
				width: 150,
				height: 150,
			}
		});
		let imageUrl = '';
		// placeholder.com lets us use parameters to specify width and height of image returned
		if (url === '') {
			imageUrl = 'https://via.placeholder.com/150x150';
		} else {
			imageUrl = url;
		}
		
		if (onPressImage !== null) {
			return (
				<TouchableOpacity style={styles.container} onPress={onPressImage}>
					<Image style={[styles.default, style]} source={{uri: imageUrl}} />
				</TouchableOpacity>
			)
		} else {
			return (
				<Image style={[styles.default, style]} source={{uri: imageUrl}} />
			)
		}

	}
}

export default MyImage
