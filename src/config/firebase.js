// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy8Ti42sZ0LB5plCkukSZhtPNHnmmEi6w",
  authDomain: "db-monitoring-project.firebaseapp.com",
  projectId: "db-monitoring-project",
  storageBucket: "db-monitoring-project.appspot.com",
  messagingSenderId: "299425946169",
  appId: "1:299425946169:web:9c604992ca295d2fc30be8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth()