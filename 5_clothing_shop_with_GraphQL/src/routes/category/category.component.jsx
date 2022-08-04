import { useContext, useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import ProductCard from "../../components/product-card/product-card.component";

// import { CategoriesContext } from "../../contexts/categories.context";

import { CategoryContainer, Title } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";

const GET_CATEGORY = gql`
  query ($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const SET_CATEGORY = gql`
  mutation ($category: Category!) {
    addCategory(category: $category) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap, loading } = useContext(CategoriesContext);
  // const [products, setProducts] = useState(categoriesMap[category]);

  // useEffect(() => {
  // setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  // To pass the title, we pass a second parameter to useQuery, an object containing the variables
  //// IMPORTANT: GraphQL use the MEMOIZATION and CACHING !!! ////
  // So GraphQL is not going te refetch data it already fetched
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: {
      title: category,
    },
  });

  // The first argument that you receive is the mutation function and then you receive the same arguments than useQuery
  // const [addCategory, { loadingAddCat, errorAddCat, dataAddCat }] =
  //   useMutation(SET_CATEGORY);
  // addCategory({
  //   variables: {
  //     category: {
  //       id: "...",
  //       title: "...",
  //       items: {
  //         id: "...",
  //         name: "...",
  //         price: 20,
  //         imageUrl: "...",
  //       },
  //     },
  //   },
  // });
  // Then  the loadingAddCat will change and the dataAddCat will come back.

  console.log(data);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (data) {
      const {
        getCollectionsByTitle: { items },
      } = data;

      setProducts(items);
    }
  }, [category, data]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {loading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
