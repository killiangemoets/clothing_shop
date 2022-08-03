import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null, // This is the default value of a set function
});

// This is the functional component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // Unsibsribe is a function
    const unsubscribe = onAuthStateChangedListener((user) => {
      // console.log(user);
      setCurrentUser(user); //we store the object if the user sign in and we store null if the user sign out
      if (user) createUserDocumentFromAuth(user);
    });

    // With useEffet, we passe callback function and it will run whatever you return from this callback function when it unmounts
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
