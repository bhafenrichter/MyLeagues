import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types'

class LoadingButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  onPress = () => {
    const {onSubmit, onComplete} = this.props;
    this.setState({
      isLoading: true,
    });
    onSubmit().then(() => {
      this.setState({
        isLoading: false,
      });
      onComplete();
    });
  }

  render() {
    const {title} = this.props;
    const {isLoading} = this.state;

    return (
      <TouchableOpacity style={styles.container} onPress={() => {this.onPress()}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </TouchableOpacity>
    );

  }
}

export default LoadingButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  text: {
    textAlign: 'center',
  }
});
