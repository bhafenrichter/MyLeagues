import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { TextInput } from 'react-native-gesture-handler';

import LeaguesAPI from './../../Data/LeaguesAPI';
import {EventBus, Events} from './../../utils/EventBus';

import LoadingButton from './../Common/LoadingButton';
import SelectLeagueType from './SelectLeagueType';
import SelectLeagueTypeSelector from './SelectLeagueTypeSelector';

class AddLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isSelectingLeague: false,
    };

    EventBus.subscribe(Events.ADD_LEAGUE, () => {
      this.setState({isModalVisible: true});
    });

    EventBus.subscribe(Events.SELECT_LEAGUETYPE, () => {
      this.setState({isSelectingLeague: true});
    });

    EventBus.subscribe(Events.SELECTED_LEAGUETYPE, (league) => {
      this.setState({isSelectingLeague: false});
    });
  }

  closeModal = () => {
    this.setState(
      { 
        isModalVisible: false,
        isSelectingLeague: false,
      
      });
  }

  createLeague = () => {
    const {id, name} = this.state;
    return LeaguesAPI.createLeague(id, name).then((response) => {
      console.log('league created!');
    });
  }

  render() {
    const {isModalVisible, isSelectingLeague} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={this.closeModal}
          onSwipeComplete={this.closeModal}
          swipeDirection={['up', 'down']}
          hideModalContentWhileAnimating={true}>
            <View style={styles.modal}>
              <View style={(isSelectingLeague) ? styles.hidden : {}}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>Create League</Text>
                </View>
                <View styles={styles.body}>
                  <TextInput style={styles.inputText} placeholder={'League Name'} />
                  <SelectLeagueType />
                </View>
                <View style={styles.footer}>
                  <LoadingButton title="Create" onComplete={() => {this.closeModal();}} onSubmit={this.createLeague} />
                </View>
              </View>
              <SelectLeagueTypeSelector />
            </View>
        </Modal>
      </View>
    );
  }
}

export default AddLeague;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  hidden: {
    opacity: 0,
    height: 0,
  },
  modal: {
      backgroundColor: 'white',
      padding: 30,
      borderRadius: 15,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    padding: 10,
  }, 
  headerText: {
    fontSize: 24,
    textAlign: 'center',
  },
  inputText: {
    textAlign: 'center',
    fontSize: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'grey',
    padding: 10,
  },
  body: {

  }
});
