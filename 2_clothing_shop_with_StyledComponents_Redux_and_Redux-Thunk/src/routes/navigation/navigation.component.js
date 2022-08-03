import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// Fragment is a component that renders to nothing when it gets mounted on the doll

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.style";

// import { UserContext } from "../../contexts/user.context";
// import { CartContext } from "../../contexts/cart.context";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  // useSelector is a hook that you pass a selector function
  // And a selector function is somethingthat extracts off the values that you want from the whole entire Redux store
  // We receive the entire state object
  // We want the userReducer so we take state.user and then we want the currentUser property
  // const currentUser = useSelector((state) => state.user.currentUser);
  const currentUser = useSelector(selectCurrentUser);

  // useContext, as ahook, tells this component that whenever a value inside of this context update, the component need to be re-render.
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  // const { currentUser } = useContext(UserContext);
  // const { isCartOpen } = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  // console.log(currentUser);

  const signOutHandler = async () => {
    await signOutUser();
    //   setCurrentUser(null);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              SIGN OUT{" "}
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
