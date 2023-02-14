import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDhrqkF_8n-5NBKnnI0uD72iW-95f2czYE",
  authDomain: "crwn-clothing-db-1f290.firebaseapp.com",
  projectId: "crwn-clothing-db-1f290",
  storageBucket: "crwn-clothing-db-1f290.appspot.com",
  messagingSenderId: "13130553957",
  appId: "1:13130553957:web:80c09d6b6390bb6dbcc48c"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // If the user does not exist, create it
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });

    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
} 