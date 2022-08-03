import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { Routes, Route } from "react-router-dom";
import { CategoriesProvider } from "../../contexts/categories.context";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
// import { setCategories } from "../../store/categories/category.action";

import { fetchCategoriesAsync } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());

    // const getCategoriesMap = async () => {
    //   const categoriesArray = await getCategoriesAndDocuments();
    //   // console.log(categoriesArray);
    //   dispatch(setCategories(categoriesArray));
    // };
    // getCategoriesMap();
  }, []);
  return (
    <CategoriesProvider>
      <Routes>
        <Route index element={<CategoriesPreview />}></Route>
        <Route path=":category" element={<Category />}></Route>
      </Routes>
    </CategoriesProvider>
  );
};

export default Shop;
