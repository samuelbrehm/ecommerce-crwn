import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCLJatsNDUnZtq_Hynqdw-iuHARIttW38U',
  authDomain: 'crwn-db-7f229.firebaseapp.com',
  databaseURL: 'https://crwn-db-7f229.firebaseio.com',
  projectId: 'crwn-db-7f229',
  storageBucket: '',
  messagingSenderId: '433874519291',
  appId: '1:433874519291:web:66f2f2564ef9db6020dc5e',
  measurementId: 'G-69K8ZXJL16',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
