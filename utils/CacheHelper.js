import {AsyncStorage} from 'react-native';

export default {
  LEAGUES: 'leagues',

  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      // Error saving data
      console.log(error);
      return null;
    }
  },

  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      // Error saving data
    }
  }
};