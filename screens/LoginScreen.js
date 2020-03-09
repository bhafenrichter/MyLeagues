import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';

import { withNavigation } from 'react-navigation';
import LeaguesAPI from './../Data/LeaguesAPI';
import MyImage from '../components/Common/MyImage';
import CacheHelper from '../utils/CacheHelper';

export class LoginScreen extends Component {
// hide the header
static navigationOptions = ({ navigation }) => {
  return {
      header: () => null
  } 
}
 componentDidMount() {

 }

 async login() {
  const {navigation} = this.props;

  // firebase token from the facebook login result
  const token = await AccessToken.getCurrentAccessToken();
  
  if (!token) {
    // facebook login
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);
 
    if (result.isCancelled) {
     console.log('user cancelled login');
     return;
   }
  }
   
   // get the credentials with the access token
   const credential = firebase.auth.FacebookAuthProvider.credential(token.accessToken);

   // login to firebase
   const firebaseResult = await firebase.auth().signInWithCredential(credential);

   // if the user previously existed, retrieve the user
   let myLeagueUser = await LeaguesAPI.getUser(firebaseResult.additionalUserInfo.profile.id);

   // if user is new, create a new account
   if (!myLeagueUser.data()) {
     myLeagueUser = await LeaguesAPI.createUser(firebaseResult.additionalUserInfo.profile);
   }

   // keep the user id for later lookups
   let cachedUser = {...{id: firebaseResult.additionalUserInfo.profile.id}, ...myLeagueUser.data()};

   // set the user in the storage
   await CacheHelper.set(CacheHelper.CURRENTUSER, cachedUser);

   navigation.navigate('Home', {});

 }

  render() {
    return (
      <ImageBackground source={require('./../Content/splashscreen-background.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View>
            <Image source={require('./../Content/logo-nobackground.png')} style={styles.logo}  />
            <Text style={styles.logoSubtitle}>MyLeagues</Text>
            <Text style={styles.version}>v 0.1</Text>
          </View>

          <TouchableOpacity onPress={() => { this.login() }} style={styles.facebookButton}>
            <Text style={styles.facebookButtonText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
     
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
    width: 150,
    height: 150,
  }, 
  logoSubtitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 36,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 20,
  },
  version: {
    marginTop: 20,
    textAlign: 'center',
    color: 'white',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 50,
    flex: 1,
  }
})