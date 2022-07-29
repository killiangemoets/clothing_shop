import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      console.log("app.js", user);

      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]); //Don't need to pass the dispatch inside bc dispatch is never gonna change
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* We can use index. It' an attribute. Writing index is the same than writing index={true}. It tells to the route that when you match just this slash, then the Home component should be shown  */}
        <Route index element={<Home />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="auth" element={<Authentication />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
