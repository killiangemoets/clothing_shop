import {
  CategoryPreviewContainer,
  CategoryTitle,
  Preview,
} from "./category-preview.style.js";

import ProductCard from "../product-card/product-card.component";

import { Link } from "react-router-dom";

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
