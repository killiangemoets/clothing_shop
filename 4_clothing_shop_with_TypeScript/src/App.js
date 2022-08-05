import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
//   getCurrentUser,
// } from "./utils/firebase/firebase.utils";
// import { setCurrentUser } from "./store/user/user.action";

//// OPTIMIZATION ////
// When we load the app, the bundle.js load containing the code for ALL the app, all the pages (not really useful)
// => CODE SPLITTING:
// We tell React and Webpack to split up our bundle into the appropriate quantities. So I land on the home page, just give me home page stuff
// => We use a combination of React Router and React (lazy and Suspense) to do something known as dynamic imports and split our code at the route level

// import Home from "./routes/home/home.component"; // It is s a syncronous import
// import Navigation from "./routes/navigation/navigation.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
// import Checkout from "./routes/checkout/checkout.component";
import Spinner from "./components/spinner/spinner.comonent";

const Home = lazy(() => import("./routes/home/home.component")); // With a dynamic import we use lazy. With lazy, React won't render this until it actually fetches it when it's required. In order to use it, we need to use React Supsense.
// So React will import this only when we are on the home page

const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) createUserDocumentFromAuth(user);
    //   // console.log("app.js", user);
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;

    dispatch(checkUserSession());
  }, [dispatch]); //Don't need to pass the dispatch inside bc dispatch is never gonna change
  return (
    <Suspense fallback={<Spinner />}>
      {/* Suspense will tell the React taht you are currently trying to fetch something in suspensed animation, i.e. it's asynchronous, */}
      {/* When one of our routes or components is being lazily loaded, we wan to render the spinner */}
      {/* For this, we use the fallback: this is where your render the component you want to show when things are loading */}

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
    </Suspense>
  );
};

export default App;
