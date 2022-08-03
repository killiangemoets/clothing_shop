import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found increament quantity
  if (existingCartItem)
    return cartItems.map((cartItem) => {
      if (cartItem.id === productToAdd.id)
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      else return cartItem;
    });

  // else add cartItem
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // if quantity is equal to 1, remove that item from the cart
  if (productToRemove.quantity === 1) {
    // return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    return cartItems;
  }
  // else decrease quantity
  return cartItems.map((cartItem) => {
    if (cartItem.id === productToRemove.id)
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    else return cartItem;
  });
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  //   return updateCartItemsReducer(newCartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  //   return updateCartItemsReducer(newCartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  //   return updateCartItemsReducer(newCartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
