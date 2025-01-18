import React, { useEffect, useState } from "react";
import { useSearchParams, useParams, useLocation } from "react-router-dom";
import ProductListCard from "../../components/productListCard/ProductListCard";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import Container from "../../components/ui/container/Container";
import createSlug from "../../utils/createSlug";
import slugToStr from "../../utils/slugToStr";

export default function ProductListPage() {
  const { category } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("nothing to show");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCategoryId = async () => {
      try {
        const slugToNormal = slugToStr(category);

        const categoryRes = await fetch(
          `http://localhost:3000/api/category?category=${slugToNormal}`
        );

        const categoryData = await categoryRes.json();

        if (categoryData) {
          setCategoryId(categoryData[0]._id);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchCategoryId();
  }, []);

  useEffect(() => {
    const fetchProductsImage = async () => {
      try {
        let queryString;

        if (searchParams) {
          queryString = searchParams ? searchParams.toString() : null;
        }

        if (categoryId) {
          const res = await fetch(
            `http://localhost:3000/api/product/category/${categoryId}?${queryString}`
          );

          const productsData = await res.json();

          if (res.status === 200) {
            setProducts(productsData);
          }
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchProductsImage();
  }, [searchParams, categoryId]);

  return (
    <Container className="productList">
      <FilterComponent
        className="filter"
        setSearchParams={setSearchParams}
      ></FilterComponent>

      <Container className="product-column">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductListCard
              key={product._id}
              data={product}
              route={`/product/${createSlug(product.name)}`}
            />
          ))
        ) : (
          <div>{error}</div>
        )}
      </Container>
    </Container>
  );
}
