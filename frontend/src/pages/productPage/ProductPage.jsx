import  { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { LiaHeartSolid } from "react-icons/lia";
import Container from "../../components/ui/container/Container";
import Title from "../../components/ui/title/Title";
import createSlug from "../../utils/createSlug";
import slugToStr from "../../utils/slugToStr";
import ProductListCard from "../../components/productListCard/ProductListCard";
import { useAuth } from "../../context/AuthContext.jsx";
import { Toaster, toast } from "react-hot-toast";
import Spinner from "../../components/ui/spinner/Spinner.jsx";
import { useUserInfo } from "../../context/UserInfoContext.jsx";
import { useCartInfo } from "../../context/cartContext.jsx";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [srcAttribute, setSrcAttribute] = useState("");
  const [size, setSize] = useState("");
  const [productList, setProductList] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPresentInWishlist , setIsPresentInWishlist] = useState(false)




  const { productName } = useParams() || "";
  const navigate = useNavigate();
  const location = useLocation();

  const { accessToken , setAccessToken} = useAuth();
  const {userInfo, setUserInfo} = useUserInfo()
  const {setCartInfo} = useCartInfo()

  const Color = (e) => {
    e.target.innerText === size ? setSize("") : setSize(e.target.innerText);
  };

  const handleClick = (e) => {
    setSrcAttribute(e.target.src);
  };
 
  const submitAddToCart = async () => {
 
    return await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`, {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           "Authorization":`Bearer ${accessToken}`
        },

        body: JSON.stringify({
           productId: product._id,
           quantity: 1,
           size: size,
         
        }),
    });
  };

  const addItemToCart = async () => {
    try {
     
   if(size){
      const res = await submitAddToCart();
      const data = await res.json();
    
      if (res.status === 403) {
       return  navigate("/account/login", {state:{from : location}} )
      } 
       
      
     if(data.cart !== null && res.status === 200){
      setCartInfo(data.cart)
      toast.success(`Product added to the cart`)
     }else if(res.status === 400){
      toast.success(`Product already added to cart `)
     }
    }else{
        toast.error("Please select a size")
      }
    } catch (error) {
      console.log("error in adding item to cart", error);
    }
  };

  const addToWishlist = async (wishlistId) => {
    try {
      if(!accessToken){
         navigate("/account/login", {state:{from : location}})
      }else{
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
               "Authorization":`Bearer ${accessToken}`
            },
            body: JSON.stringify({
              wishlistId,
              wishlistAction: "save",
            }),
          }
        );
  
        const data = await res.json();
     
        if (res.status === 200) {
          setUserInfo(data.userData)
          toast.success(`Product added to wishlist`);
        }
      }
    } catch (error) {
      toast.error("error : ", error);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setSize("")
        setIsLoading(true);
       
        if (productName) {
          const name = slugToStr(productName);
        
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/product?name=${name}`
          );

          const data = await res.json();
         
          if (res.status === 200) {
            setSrcAttribute(data.products[0].productImgUrls[0]);
            setProduct(data.products[0]);

            setCategoryId(data.products[0].categoryId);
            console.log("aka")
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
  
    if(productName){
     fetchProductData();
    }
  }, [productName]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        if (categoryId) {
         
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/filter?categoryId=${categoryId._id}`
          );
       
         
          const productList = await res.json();
        
          if (productList !== null) {
            setProductList(productList);
            
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
 
   if(categoryId){
    fetchProductsData()
   };
  }, [categoryId, productName]);

  
   useEffect(() => {

    if(userInfo !== null && product !== null){
   
    const productPresentInWishlist =  userInfo.wishlist.some(obj =>  obj._id === product._id)
 
    if(productPresentInWishlist){
      setIsPresentInWishlist(true)
    }else{
      setIsPresentInWishlist(false)
    }
    }else{
      setIsPresentInWishlist(false)
    }
  }, [userInfo, product])





useEffect(() => {
  if(!accessToken && localStorage.getItem("userAccessToken")){
    setAccessToken(localStorage.getItem("userAccessToken"))
   }
}, [accessToken, setAccessToken])




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productName]);

  return (
    <Container className="product-page-con">
      {isLoading?<Spinner></Spinner>: (
        <>
          <Container className="productPage">
            <Container className="product-img-sec">
              <Container className="img-sub-sec1">
                {product.productImgUrls.map((productImage, index) => {
                  return (
                    <img src={productImage} key={index} onClick={handleClick} />
                  );
                })}
              </Container>

              <Container className="img-sub-sec2">
                <img src={`${srcAttribute}`} />
              </Container>
            </Container>

            <Container className="product-info-sec">
              <h1 className="name">{product.name.toUpperCase()}</h1>

              <Container className="price">
                <Title title={`Inr ${product.price}`} />
                <h3>incl. all taxes</h3>
              </Container>

              <Container className="description">
                <Title title="description" />

                <h3>{product.description}</h3>
              </Container>
              <Container className="wash-care">
                <Title title="Wash Care" />

                <h3>machine wash</h3>
              </Container>

              <Container className="material-type">
                <Title title="Material Type" />
                <h3>{product.materialType}</h3>
              </Container>

              <Container className="size-sec">
                <Title title="Sizes" />

                <ul className="size">
                  {product.sizes.map((sizevalue, index) => {
                    return (
                      <li
                        className="pointer"
                        key={index}
                        onClick={Color}
                        style={
                          size === `${sizevalue}`
                            ? { backgroundColor: "grey" }
                            : null
                        }
                      >
                        {sizevalue}
                      </li>
                    );
                  })}
                </ul>
              </Container>

              <Container className="button-box">
                <button
                  type="button"
                  className="button1"
                  onClick={() => addToWishlist(product._id)}
                >
                  <LiaHeartSolid
                    style={isPresentInWishlist?{ color: "red", marginRight: "10px" }: {color: "white", marginRight: "10px"}}
                    size={24}
                  />
                  WishList
                </button>
                <button
                  type="button"
                  className="button2"
                  onClick={addItemToCart}
                >
                  Add to Cart
                </button>
              </Container>
            </Container>
          </Container>

          <Container className="recommendation-sec">
            <Title className="title" title="Similar Products" />

            <Container className="product-column">
              {productList && productList.length > 0
                ? productList.map((prod) => {
                    if (prod._id !== product._id) {
                      return (
                        <ProductListCard
                          key={prod._id}
                          data={prod}
                          type="productList"
                          route={`/product/${createSlug(prod.name)}`}
                        />
                      );
                    }
                  })
                : "nothing to show"}
            </Container>
            <Toaster />
          </Container>
        </>
      )}
    </Container>
  );
}
