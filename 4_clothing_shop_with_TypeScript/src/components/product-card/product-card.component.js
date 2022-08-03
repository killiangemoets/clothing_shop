import {
  ProductCardContainer,
  Footer,
  FooterName,
  FooterPrice,
} from "./product-card.style";

// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const ProductCard = ({ product }) => {
  // const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Better for readability and optimization
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <FooterName>{name}</FooterName>
        <FooterPrice>{price}</FooterPrice>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
