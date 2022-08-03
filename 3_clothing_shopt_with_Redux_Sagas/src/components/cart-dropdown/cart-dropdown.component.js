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

const CartDropdown = () => {
  // const { cartItems } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
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
    </CartDropdownContainer>
  );
};

export default CartDropdown;
