// Why putting this content in an utils file? => It's a layer between the frontend and this additional library (easier if I have to make a change/update later)

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  DocumentSnapshot,
} from "firebase/firestore";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // Firebase will give back a document reference even if it doesn't exist yet.

    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  //That gives me an object that I can get a snapshot from:
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   // console.log(docSnapshot.data());
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // console.log(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

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

  // return userDocRef;

  // Now we want the userSnapshot bc it contains the data while the userDocRef is just a pointer to the space where the data could live
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); // Change when a user sign in or sign out and so it calls our callback function

// next: callback,
// error: errorCallback,
// complete: completeCallback

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
