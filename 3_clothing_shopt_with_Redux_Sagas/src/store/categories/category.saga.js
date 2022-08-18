import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    //Note: we cannot have async await in the generator
    // Instead of await, we need to yield

    // Note 2: when you have a function and you wanna turn it into an effect, you use the call keyword
    // The call method takes different arguments:
    // - a function
    // - the parameters/arguments for this function
    const categoriesArray = yield call(getCategoriesAndDocuments);

    // Instead of dispatch, we call put
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

// The first generator that we want to write is something that triggers when we call fetchCategoriesStart
export function* onFetchCategories() {
  // TakeLatest means that if you hear a bunch of the same action, give me the latest one
  // TakeLatest takes 2 arguments:
  // - the actual action type you want to respond to
  // - what you want to actually happen
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // all is an effect that run everything inside and only complete when all of it is done
  // all takes an array of different things that we are calling
  yield all([call(onFetchCategories)]);
}

// BIG NOTE: Generators respond to actions the same way that reducers do inside of their switch
// Whenever an action happened and I hear it, I want to do something with it.
