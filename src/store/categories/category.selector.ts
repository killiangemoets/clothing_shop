import { createSelector } from "reselect";
//createSelector creates for us a memorised selector
// To save the result of a pure function so when we enter the same inputs again we can give back the output directly without running the function.

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): CategoriesState => {
  // console.log("selector 1 fired");
  return state.categories;
}; // state.cotegories is the categories slice (bc state also containes user and cart)

// Memoized selector

// createSlector creates a selector and it takes 2 arguments. The first is an array of input selectors and the second is the output selector.

// so since we are using a function for the first argument, the output of the first argument need to be the input of the second (the output of selectCategoryReducer is categoriesSlice)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export const selectCatagories = createSelector(
  // [selectCategoryReducer, selectCurrentUSer],
  // (categories, currentUser) => {}
  [selectCategoryReducer],
  (categoriesSlice) => {
    // console.log("selector 2 fired");
    // console.log("categoriesSlice", categoriesSlice);
    // console.log("categories", categoriesSlice.categories);
    return categoriesSlice.categories;
  }
);

// export const selectCategoriesMap = (state) => {
// It will memoize a second time
export const selectCategoriesMap = createSelector(
  [selectCatagories],
  (categories): CategoryMap => {
    // console.log("selector 3 fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap);
  }
);

// Selectors 2 and 3 combined

// export const selectCategoriesMap2 = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => {
//     console.log("selector 2 fired");
//     return categoriesSlice.categories.reduce((acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items;
//       return acc;
//     }, {});
//   }
// );
