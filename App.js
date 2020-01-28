import React from 'react';
import Navigation from './utils/Navigation';

import firebase from '@react-native-firebase/app';

export default function App() {

  // Initialize default app
  // Retrieve your own options values by adding a web app on
  // https://console.firebase.google.com

  if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp({
      appId: "1:244445034918:android:96ac24aedf8abe6881b767",
      apiKey: "AIzaSyC0gwS9XgZbjPBpOCmUGfItASrCO-6Rgi8",          // Auth / General Use
      authDomain: "myleagues.firebaseapp.com",                     // Auth with popup/redirect
      databaseURL: "https://myleagues-59885.firebaseio.com",      // Realtime Database
      storageBucket: "YOUR_APP.appspot.com",                      // Storage
      messagingSenderId: "",
      projectId: "myleagues-59885",
    });
  }
  return (
    <Navigation />
  );
}
