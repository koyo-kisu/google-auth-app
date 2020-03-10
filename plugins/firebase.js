import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD8I-PbIxfgjmbflndztPCZR5E9XyRSq6k",
  authDomain: "auth0309-13576.firebaseapp.com",
  databaseURL: "https://auth0309-13576.firebaseio.com",
  projectId: "auth0309-13576",
  storageBucket: "auth0309-13576.appspot.com",
  messagingSenderId: "232018044861",
  appId: "1:232018044861:web:07fdec7c6e38f0d3c494d4",
  measurementId: "G-1SQT4S21CY"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default firebase;