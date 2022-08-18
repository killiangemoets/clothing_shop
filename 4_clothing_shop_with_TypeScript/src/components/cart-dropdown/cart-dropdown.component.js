import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.style";
import Button from "../button/button.component";

import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";

// import { CartContext } from "../../contexts/cart.context";
// import { useContext } from "react";

import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useCallback, useState, useMemo } from "react";

const sleep = (milliseconds) => {
  var start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  // Our really expensive function is running every time the component is refresh (even if count didn't change!) => So we want to run this function only if count changed!
  // useMemo memorizes the value inside of the hook
  // When hundedCount will initizalize, useMemo will calculate the value inside of  this function and then it will memoize that value somewhere
  // So every time you reference it, it will now be using that memoized value unless whatever dependency (from the dependency array) changes
  const hundredCount = useMemo(() => {
    console.log("start");
    sleep(2000);
    console.log("end");
    return 100 + count;
  }, [count]);

  // const [temp, setTemp] = useState("A");

  // Everytime the component is refresh, react will re initialize this function unless we use useCallback
  // With useCallback, React is memoizing the function (not the output of the function but the function itself!)
  // useCallback is a hook that takes two parameters
  // - the actual callback that you want to memorize
  // - the dependency array that determines when it's time to re memorize the function
  const goToCheckoutHandler = useCallback(() => {
    // IMPORTANT: with useCallback the function if memoized
    // => It means that all the scope of all the values inside of this function are all being kept and memoized
    // console.log(temp);
    navigate("/checkout");
    // }, [temp]); // We need to  add temp in the depedency array if we want the values inside the scoop to update
  }, []);

  //////// useCallback VS useMemo ////////
  // useCallback memoizes the function itself
  // useMemo memoizes the return value of the function

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
      {/* <Button onClick={() => setTemp("B")}>Update Temp</Button> */}
      {/* {hundredCount} */}
      {/* <Button onClick={() => setCount(count + 1)}>Set count value</Button> */}
    </CartDropdownContainer>
  );
};

export default CartDropdown;
