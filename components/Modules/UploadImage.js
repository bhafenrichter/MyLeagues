import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import MyImage from '../Common/MyImage';

import PropTypes from 'prop-types';

export class UploadImage extends Component {
  constructor(props) {
    super(props);

    this.state ={
      isUploaded: false,
    }
  }

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    width: 150,
    height: 150,
  };

  render() {
    const {isUploaded} = this.state;
    const {height, width} = this.props;
    const padding = 10;
    const styles = StyleSheet.create({
      container: {
    
      },
      placeholderText: {
        position: "absolute",
        width: width,
        height: height,
        top: (height / 2) - padding,
        textAlign: 'center',
      }
    });

    if (!isUploaded) {
      return (
        <View style={styles.container}>
          <TouchableOpacity>
            <MyImage />
            <Text style={styles.placeholderText}>Click to Upload Image</Text>
          </TouchableOpacity>

        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          {/* TODO */}
        </View>
      )
    }

  }
}

export default UploadImage
