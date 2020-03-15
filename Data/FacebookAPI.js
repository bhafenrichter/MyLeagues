import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';

export default {
  getFriends(callback) {
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=friends{picture,name}',
      null,
      (error, response) => {
        callback(response);
      }
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  },
  
  login: async () => {
      // facebook login
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);

      if (result.isCancelled) {
      console.log('user cancelled login');
      return;
    }

      // firebase token from the facebook login result
      const token = await AccessToken.getCurrentAccessToken();
      
      if (!token) {
        console.log('token not received');
        return;
      }
      
      // get the credentials with the access token
      const credential = firebase.auth.FacebookAuthProvider.credential(token.accessToken);

      // login to firebase
      const firebaseResult = await firebase.auth().signInWithCredential(credential);

      return firebaseResult;
  }
}