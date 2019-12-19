import React, { Component } from 'react'
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native'

import PropTypes from 'prop-types'; 

export class MyImage extends Component {

	static propTypes = {
		url: PropTypes.string,
		onPressImage: PropTypes.func,
		width: PropTypes.number,
		height: PropTypes.number,
	}

	static defaultProps = {
		onPressImage: null,
		url: '',
		width: 150,
		height: 150,
	}


	render() {
		const {url, onPressImage, width, height} = this.props;
		const styles = StyleSheet.create({
			container: {
				flex: 1,
				justifyContent: 'center',
			},
			default: {
				width: width,
				height: height,
			}
		});
		let imageUrl = '';

		// placeholder.com lets us use parameters to specify width and height of image returned
		if (url === '') {
			imageUrl = 'https://via.placeholder.com/' + width + 'x' + height;
		} else {
			imageUrl = url;
		}
		
		console.log(imageUrl);
		if (onPressImage !== null) {
			return (
				<TouchableOpacity style={styles.container} onPress={onPressImage}>
					<Image style={styles.default} source={{uri: imageUrl}} />
				</TouchableOpacity>
			)
		} else {
			return (
				<Image style={styles.default} source={{uri: imageUrl}} />
			)
		}

	}
}

export default MyImage
