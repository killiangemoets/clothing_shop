import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";

import { AnyAction } from "redux";

import {
  // CategoryAction,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

export type CategoriesState = {
  //readonly is an additional property you can add so that this state object can never be modified
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false, //we add it now that we use Redux-Thunk
  error: null, // Since we do asynchronous fetching
};

// Problem : we have a lot of actions due to redux-persist or actions userful for other reducers (cart, user, etc.), and when these are action are called we passe trough this reducer event though the action is not an action of the type CategoryAction
// So we need to modifi our reducer.utils filce
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction //this action is only gonna be one of this trhee action types. This pattern is called a DISCRIMINATING union bc it says that I only want to accept actions of these three types
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }
  return state;

  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return { ...state, isLoading: true };
  //   // case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       isLoading: false,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return {
  //       ...state,
  //       error: action.payload,
  //       isLoading: false,
  //     };
  //   default:
  //     return state;
  // }
};
