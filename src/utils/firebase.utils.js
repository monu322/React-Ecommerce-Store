import {initializeApp} from 'firebase/app'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'


import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB3FiPeWz2WkzCc5dGi7e5dJfY3xjQQPcA",
  authDomain: "react-store-new.firebaseapp.com",
  projectId: "react-store-new",
  storageBucket: "react-store-new.appspot.com",
  messagingSenderId: "878964054445",
  appId: "1:878964054445:web:3c01bd1072119291bee924",
  measurementId: "G-BP2XS8ZSHJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=>signInWithPopup(auth, provider);

export const db = getFirestore();

export const createDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch(error){
      console.log('error creating the user', error.msg)
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};