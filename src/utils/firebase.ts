import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDunUO5FEUUR-bUZ_-2bl-rJXTgI1REpms',
  authDomain: 'netflixgpt-3871e.firebaseapp.com',
  projectId: 'netflixgpt-3871e',
  storageBucket: 'netflixgpt-3871e.firebasestorage.app',
  messagingSenderId: '107658906962',
  appId: '1:107658906962:web:39eae4296401b54e02be8b',
  measurementId: 'G-W3GNLECSJE',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
