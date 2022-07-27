import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return <h1>Welcome on The Shop Page</h1>;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* We can use index. It' an attribute. Writing index is the same than writing index={true}. It tells to the route that when you match just this slash, then the Home component should be shown  */}
        <Route index element={<Home />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
