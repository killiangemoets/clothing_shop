import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;

// GraphQl is a replacement for Redux. It's very rare that you will utilize both GraphQl and Redux
// A Query is a request for data
// A Mutation is a request to modify or add data

//// APOLLO VS REDUX ///
/*
- In order to use Apollo and GraphQL on the frontend, the backend must be set up similarly to spit out GraphQL, i.e. the backend must support GraphQL
=> There's a lot of code to update on a server in order for it to be a GraphQL server.

But the advantage is that is becomes more transparent to us on the frontend

*/
