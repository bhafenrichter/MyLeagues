import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';


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
  }
}