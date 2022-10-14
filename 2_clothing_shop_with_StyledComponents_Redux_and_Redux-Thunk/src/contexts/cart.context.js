import { createContext, useState, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  total: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CART_ITEMS":
      return { ...state, ...payload };
    case "SET_IS_CART_OPEN":
      return { ...state, isCartOpen: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // // One way to update the cartCount is by using the useEffect hook.
  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, item) => total + item.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  // // We use another useEffect Hook beause one of the best practice when using use effect is to make sure it just governs one singular responsibility
  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { cartItems, cartCount, cartTotal, isCartOpen } = state;

  const setIsCartOpen = (bool) => {
    // dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, paylod: bool});
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const updateCartItemsReducer = (newCartItems) => {
    // generate newCartTotal
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    // generate newCartCount
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Dispatch new action with payload = {
    //   newCartItems,
    //   newCartTotal,
    //   nexCartCount
    // }
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
