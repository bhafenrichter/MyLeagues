import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NeomorphBox } from 'react-native-neomorph-shadows';

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
    style: PropTypes.style,
  };

  static defaultProps = {
    title: '',
    style: {},
  };

  onPress = async () => {
    const {onSubmit, onComplete} = this.props;
    this.setState({
      isLoading: true,
    });
    const result = await onSubmit();
    this.setState({
      isLoading: false,
    });
    onComplete(result);
  }

  render() {
    const {title, style} = this.props;
    const {isLoading} = this.state;

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={() => {this.onPress()}}>
        <NeomorphBox
          outer // <- enable shadow inside of neomorph
          useSvg
          swapShadowLevel // <- change zIndex of each shadow color
          style={{
            shadowRadius: 3,
            borderRadius: 25,
            backgroundColor: '#DDDDDD',
            width: 200,
            height: 40,
          }}
          >
          {isLoading ? (
            <ActivityIndicator style={styles.text} />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
        </NeomorphBox>
      </TouchableOpacity>
    );

  }
}

export default LoadingButton;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
  }
});
