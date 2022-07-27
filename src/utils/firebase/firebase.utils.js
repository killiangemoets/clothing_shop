// Why putting this content in an utils file? => It's a layer between the frontend and this additional library (easier if I have to make a change/update later)

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuBqMFIbg65M_1IugE-OZ6B7mLbNK8bOg",
  authDomain: "clothingshop-9aaee.firebaseapp.com",
  projectId: "clothingshop-9aaee",
  storageBucket: "clothingshop-9aaee.appspot.com",
  messagingSenderId: "801589704097",
  appId: "1:801589704097:web:da6e5935a14338b02907e0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// GoogleAuthProvider is a class
// In order to use this Google authentification, we need to first initialize a provider using this GoogleAuthProvider class
const googleProvider = new GoogleAuthProvider();

// These custom parameters will take some kind of configuration object to tell different ways we want this Google auth provider to behave
googleProvider.setCustomParameters({
  prompt: "select_account", // it means that every time somebody interacts with our provider, we want to always force them to select an account.
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); //this point to our database

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // If user data does not exist
  // I want to create/set the document with the data from the userAuth in my collection. And I wanna set it using the userSnapshot bc it's already pointing to a specific place in a collection for the data that we want
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // If user data exists
  // nothing

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
