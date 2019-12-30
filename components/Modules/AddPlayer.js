import React, { Component } from 'react'
import { StyleSheet, View, Modal } from 'react-native'

import SelectPlayer from './SelectPlayer';

export class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true,
    };
  }


  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  render() {
    const {isModalVisible} = this.props;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={this.closeModal}
          onSwipeComplete={this.closeModal}
          swipeDirection={['up', 'down']}
          hideModalContentWhileAnimating={true}>
            <View style={styles.modal}>
              <SelectPlayer isVisible={true} callback={() => {}}/>
            </View>
        
      </Modal>
      </View>
    
    )
  }
}

export default AddPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
  },
})