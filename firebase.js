const firebase =require('firebase')
const firestore =require('firebase/firestore')
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCxRrgDA4HcuO01IAk9M8ZvHM_9UvoAKjw",
  authDomain: "scdt-c8874.firebaseapp.com",
  databaseURL: "https://scdt-c8874.firebaseio.com",
  projectId: "scdt-c8874",
  storageBucket: "scdt-c8874.appspot.com",
  messagingSenderId: "399628593521",
  appId: "1:399628593521:web:b89190436fd1d821fb2ed0",
  measurementId: "G-V6N0S4L18Y"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()