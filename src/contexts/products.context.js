import { createContext, useState, useEffect } from "react";

import PRODUCTS from "../shop-data.json";

// Actual value you want to access
export const ProductsContext = createContext({
  products: [],
});

// This is the functional component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
