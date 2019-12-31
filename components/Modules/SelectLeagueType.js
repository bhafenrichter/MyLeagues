import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

import LeagueType from './LeagueType';

import {EventBus, Events} from './../../utils/EventBus';

class SelectLeagueType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      count: '',
      id: '',
    };

    EventBus.subscribe(Events.SELECTED_LEAGUETYPE, (league) => {
      this.setState({
        title: league.title,
        count: league.count,
        id: league.id,
      });
    });

  }
  
  triggerSelector = () => {
    EventBus.trigger(Events.SELECT_LEAGUETYPE);
  }

  render() {
    const {title, count} = this.state;

    if (title !== '') {
      return (
        <View>
          <LeagueType title={title} count={count} onPress={() => {this.triggerSelector() }} />
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => { this.triggerSelector() }}>
          <LeagueType isEmpty={true} />
        </TouchableOpacity>
      );
    } 
  }
}

export default SelectLeagueType;
