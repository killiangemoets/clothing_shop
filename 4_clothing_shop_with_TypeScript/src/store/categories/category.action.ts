import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

// // We will create a union
// export type CategoryAction =
//   | FetchCategoriesStart
//   | FetchCategoriesSuccess
//   | FetchCategoriesFailed;

// Whenever this function gets called, we are guaranteed to get back is the action of fetchCategoryStart
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

// We will attach a match method. It will check the action that it receives againt the action that it meants to create

export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);

// THUNK ACTION:
// Thunk recommends that you declare your thunk actions with the last word "async"
// it's a function that returns a function that gets a dispatch
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error));
//   }
// };
