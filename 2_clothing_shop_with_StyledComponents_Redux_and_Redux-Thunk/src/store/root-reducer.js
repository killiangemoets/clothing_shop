import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

// In combineReducers we pass an object where the keys and the values are the name of the reducer slice and the actual reducer function itself
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
