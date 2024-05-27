// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyBOzfRPSFwAwQ424x6jqP_6aq7Cr7NrEI0',
  authDomain: 'sky-fitness-pro-c4ed0.firebaseapp.com',
  databaseURL:
    'https://sky-fitness-pro-c4ed0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'sky-fitness-pro-c4ed0',
  storageBucket: 'sky-fitness-pro-c4ed0.appspot.com',
  messagingSenderId: '174653201962',
  appId: '1:174653201962:web:45aa9747fdaf57d4fead53',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
