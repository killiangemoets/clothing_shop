import { compose, createStore, applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

// import logger from "redux-logger";
import { loggerMiddleware } from "./middleware/logger";

import thunk from "redux-thunk";

// Middlewares are kind of little library helpers that run before an action hist the reducer

//// CURRYING ////
// Currying a function is a function that returns you back another one
// const curryFuc1 = (a) => {
//   return (b, c) => {
//     return a + b - c;
//   };
// };
const curryFuc = (a) => (b, c) => {
  return a + b - c;
};
const with3 = curryFuc(3);
with3(2, 4); // 3+2-4

// const middleWares = [logger];
// We can create a middleWare by ourself: see loggerMiddleware

// const middleWares = [logger];

// This middleWare is of course only for development!
const middleWares = [
  process.env.NODE_ENV === "development" && loggerMiddleware,
  thunk,
].filter(Boolean);
// If we are not in development mode, we will pass false into this array, and we don't want to pass a boolean value into our middleWares array, so we use filter to remove this boolean value from our array

// How the thunk middleware workss:
// const thunkMiddleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(dispatch);
//   }
// };

// In order for the middlewares to work we need to call applyMiddleware
// compose is a way for us to pass multiple functions left to right

// If we are in dev mode and there is a window object, and these dev tools exist, then use the own compose from the DevTools extension, which is attached to window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// Otherwise, just use the compase that we have from Redux
const composedEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const composedEnhancers = compose(applyMiddleware(...middleWares));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

const persistConfig = {
  key: "root", // the key is the part that we want to start with, and "root" says that I want to persist the whole thing
  storage,
  blackList: ["user"], //We add a black list with the value we don't wanna persist (we can also add a white list with the value we wanne persist)
  // We don't need to persist the user bc it comes from getAuth.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// createStore takes 3 arguments:
// - the only one necessary: the root reducer
// - the second argument is if you want to add any additional default state here
// - the logger: allow us to see what the state looks like before an action is dispatched, what the action is, and then how the state in trun looks after the action

// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
