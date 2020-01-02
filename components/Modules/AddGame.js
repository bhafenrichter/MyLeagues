import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Modal from "react-native-modal";

import SelectPlayer from './SelectPlayer';
import ProfileIcon from '../Common/ProfileIcon';
import { TextInput } from 'react-native-gesture-handler';
import UniversalStyles from './../../utils/UniversalStyles';

import {EventBus, Events} from './../../utils/EventBus';
import LoadingButton from '../Common/LoadingButton';

class AddGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isSelectPlayerVisible: false,
      selectedPlayer: '',
      userScore: '',
      opponentScore: '',
    };

    EventBus.subscribe(Events.ADD_GAME, (args) => {
      this.setState({
        isModalVisible: true,
      });
    });
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  selectPlayer = (name, url) => {
    this.setState(
      { 
        isSelectPlayerVisible: false,
        selectedPlayer: name,
      }
    );
  }

  updateScore = (textbox, score) => {
    if (textbox === 'user') {
      this.setState({
        userScore: score,
      });
    } else {
      this.setState({
        opponentScore: score,
      });
    }
  }

  submitGame = () => {
    return new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve('foo');
      }, 300);
    });
  }

  render() {
    const {isModalVisible, isSelectPlayerVisible, userScore, opponentScore} = this.state;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={this.closeModal}
          onSwipeComplete={this.closeModal}
          swipeDirection={['up', 'down']}
          hideModalContentWhileAnimating={true}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <View>
                <ProfileIcon size={125} showCaption={false} />
                <Text style={styles.text}>HAF</Text>
                <TextInput keyboardType="number-pad" value={userScore} onChangeText={(text) => {this.updateScore('user', text) }} style={[UniversalStyles.styles.input, styles.textbox]} />
              </View>
              <View>
                <Text style={styles.versus}>Vs.</Text>
              </View>
              <View>
                <SelectPlayer callback={this.selectPlayer} isVisible={isSelectPlayerVisible} />
                <TextInput keyboardType="number-pad" value={opponentScore} onChangeText={(text) => {this.updateScore('opponent', text) }} style={[UniversalStyles.styles.input, styles.textbox]} />
              </View>
              
            </View>
            <View style={styles.footer}>
              <LoadingButton onSubmit={this.submitGame} onComplete={this.closeModal} title="Create" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default AddGame;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }, 
    modal: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 300,
      alignItems: 'baseline',
    },
    footer: {
      padding: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: 24,
      padding: 10,
    },
    textbox: {
      textAlign: 'center',
      fontSize: 36,
      borderBottomColor: UniversalStyles.colors.grey,
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: 75,
      flex: 1,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    versus: {
      color: UniversalStyles.colors.grey,
      textAlign: 'center',
    },
    button: {
      borderRadius: 15,
    }
});
