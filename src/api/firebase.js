import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

const firestore = app.firestore();
export const database = {
  folders: firestore.collection('folders'),
  files: firestore.collection('files'),
  formatDoc: (doc) => ({ id: doc.id, ...doc.data() }),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const auth = app.auth();
export const storage = app.storage();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default app;
