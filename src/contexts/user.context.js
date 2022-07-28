import { createContext, useState, useEffect, useReducer } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";

// Actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null, // This is the default value of a set function
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  // console.log("dispatched");
  // console.log(action);
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// This is the functional component
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  //  INSTEAD OF USING USESTATE, WE NOW USE A REDUCER

  // UseReduce takes 2 arguments:
  // - the reducer
  // - the initial value
  // We get back :
  // - the state object, i.e the current value being stored bythe reducer
  // - the dispatch function, i.e. a function that whenever you it, you pass it an action object.
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;

  // console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };
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
