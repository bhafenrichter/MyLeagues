import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';

import { withNavigation } from 'react-navigation';
import MyImage from '../components/Common/MyImage';

export class LoginScreen extends Component {

 componentDidMount() {

 }

 async login() {
  const {navigation} = this.props;

   // facebook login
   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

   if (result.isCancelled) {
    console.log('user cancelled login');
    return;
  }

   // firebase token from the facebook login result
   const token = await AccessToken.getCurrentAccessToken();

   if (!token) {
     console.log('error getting access token')
   }
   
   // get the credentials with the access token
   const credential = firebase.auth.FacebookAuthProvider.credential(token.accessToken);

   // login to firebase
   await firebase.auth().signInWithCredential(credential);
   console.log(credential);

   navigation.navigate('Home', {});
 }

  render() {
    return (
      <View style={styles.container}>
        <MyImage />
        <TouchableOpacity onPress={() => { this.login() }} style={styles.facebookButton}>
          <Text style={styles.facebookButtonText}>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withNavigation(LoginScreen)

const styles = StyleSheet.create({
  facebookButton: {
    backgroundColor: '#4e71ba',
    padding: 15,
    borderRadius: 100,
    width: 200,
  },
  facebookButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  logo: {

  }, 
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 50,
    flex: 1,
  }
})