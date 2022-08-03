import { USER_ACTION_TYPES } from "./user.types";

import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import {
  SignInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess,
  signInFailed,
} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: Boolean;
  readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action))
    return {
      ...state,
      currentUser: action.payload,
      error: null,
    };

  if (signOutSuccess.match(action))
    return { ...state, currentUser: null, error: null };

  if (
    signInFailed.match(action) ||
    signUpFailed.match(action) ||
    signOutFailed.match(action)
  )
    return {
      ...state,
      error: action.payload,
    };

  return state;

  // switch (action.type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: action.payload,
  //       error: null,
  //     };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return { ...state, currentUser: null, error: null };
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //     return {
  //       ...state,
  //       error: action.payload,
  //     };
  //   default:
  //     return state;
  // }
};
