import { useEffect, useState, useRef } from "react";
import {
  useSearchParams,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import ProductListCard from "../../components/productListCard/ProductListCard";
import FilterComponent from "../../components/filterComponent/FilterComponent";
import Container from "../../components/ui/container/Container";
import createSlug from "../../utils/createSlug";
import slugToStr from "../../utils/slugToStr";
import Spinner from "../../components/ui/spinner/Spinner";
import { CgArrowsExchangeV } from "react-icons/cg";
import { FiFilter } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function ProductListPage() {
  const { category } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const filterRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    const subCategoryArray = ["topwear", "bottomwear", "trending"];

    const fetchCategoryId = async () => {
      try {
        setIsLoading(true);

        const slugToNormal = slugToStr(category);

        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/category?category=${slugToNormal}`
        );

        const { categoryValue } = await res.json();

        if (categoryValue) {
          setCategoryId(categoryValue[0]._id);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/`
        );

        const data = await res.json();

        if (res.status === 200 && category !== "trending") {
          const p = data.products.filter(
            (product) => product.categoryId.subCategory === category
          );
          setProducts(p);
          setIsLoading(false);
        } else {
          const p = data.products.filter(
            (product) => product.categoryId.trending
          );
          setProducts(p);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error , ", error);
        setIsLoading(false);
      }
    };

    if (!subCategoryArray.includes(category)) {
      fetchCategoryId();
    } else if (subCategoryArray.includes(category)) {
      fetchAllProducts();
    }
  }, [category]);

  useEffect(() => {
    const fetchProductsImage = async () => {
      try {
        const subCategoryArray = ["topwear", "bottomwear"];
        let queryString;

        if (searchParams) {
          queryString = searchParams ? searchParams.toString() : null;
        }

        if (
          categoryId ||
          subCategoryArray.includes(category) ||
          category === "trending"
        ) {
          const res = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/product/filter?categoryId=${categoryId}&subCategory=${category}&${
              queryString ? queryString + "&" : ""
            }`
          );

          const productsData = await res.json();

          if (res.status === 200) {
            setProducts(productsData);
            setIsLoading(false);
          } else if (res.status === 404) {
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log("error:", error);
        setIsLoading(false);
      }
    };

    if (searchParams) {
      fetchProductsImage();
    }
  }, [searchParams, categoryId, category]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hideFilter = () => {
    setIsFilterVisible(false);
  };

  const handleSorting = (typeOfSorting) => {
    if (typeOfSorting === "ascending") {
      setProducts((prev) =>
        [...prev].sort((product1, product2) => {
          return product1.price - product2.price;
        })
      );
    } else {
      setProducts((prev) =>
        [...prev].sort((product1, product2) => {
          return product2.price - product1.price;
        })
      );
    }

    if (products) {
      setIsSortVisible(false);
    }
  };

  useEffect(() => {
    if (!accessToken && localStorage.getItem("userAccessToken")) {
      setAccessToken(localStorage.getItem("userAccessToken"));
    }
  }, [accessToken, setAccessToken]);

  useEffect(() => {
    if ((isSortVisible || isFilterVisible) && isMobile) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, isSortVisible, isFilterVisible]);

  return (
    <Container className="product-list-container">
      {isLoading ? (
        <Spinner height="100vh" width="100%"></Spinner>
      ) : (
        <Container className="productList">
          {isMobile && !isFilterVisible && (
            <Container className="productList-icon-con">
              <Container>
                <CgArrowsExchangeV
                  className="productList-icon"
                  onClick={() => setIsSortVisible((prev) => !prev)}
                />
                <h1 onClick={() => setIsSortVisible((prev) => !prev)}>SORT</h1>
              </Container>
              <div className="line"></div>
              <Container>
                <FiFilter
                  className="productList-icon"
                  onClick={() => setIsFilterVisible((prev) => !prev)}
                />
                <h1 onClick={() => setIsFilterVisible((prev) => !prev)}>
                  FILTER
                </h1>
              </Container>
            </Container>
          )}
          {(!isMobile || isFilterVisible) && (
            <Container className="filterCon">
              <FilterComponent
                ref={filterRef}
                isMobile={isMobile}
                hideFilter={hideFilter}
                className="filter"
                setSearchParams={setSearchParams}
              ></FilterComponent>
            </Container>
          )}
          {isMobile && isSortVisible && (
            <Container className="sort-con">
              <Container className="sort">
                <h2 onClick={() => handleSorting("descending")}>
                  Price : High to Low
                </h2>
                <h2 onClick={() => handleSorting("ascending")}>
                  Price : Low to High
                </h2>
                <button onClick={() => setIsSortVisible(false)}>go back</button>
              </Container>
            </Container>
          )}

          {products && products.length > 0 ? (
            <Container className="product-column">
              {products.map((product) => (
                <ProductListCard
                  key={product._id}
                  data={product}
                  route={`/product/${createSlug(product.name)}`}
                />
              ))}
            </Container>
          ) : (
            <Container className="product-list-error">
              <h2>{"nothing to show"}</h2>
              <Link to="/" className="product-list-link">
                <h2>Go to Home page</h2>
              </Link>
            </Container>
          )}
        </Container>
      )}
    </Container>
  );
}
