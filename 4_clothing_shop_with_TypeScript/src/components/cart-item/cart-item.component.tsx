import { CartItemContainer, ItemDetails, ItemName } from "./cart-item.style";

import { CartItem as TCartItem } from "../../store/cart/cart.types";

import { FC, memo } from "react";
// When we add an item to the cart, all the items already in the carts will re render while it's not useful bc they didn't change
// The key values are being tracked by React
// So in order to improve it, we can use this memo method

// Unless the actual value changes, we don't need to re render this component
// Note: to see when a component render we can use Profiler (from the React Developer Tool extension)

type CartItemProps = {
  cartItem: TCartItem;
};

// const CartItem = memo(({ cartItem }) => {
const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
