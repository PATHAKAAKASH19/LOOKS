import { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import { useUserInfo } from "../../../context/UserInfoContext";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { useCartInfo } from "../../../context/cartContext";
import Spinner from "../../ui/spinner/Spinner";

export default function Wishlist() {
  const { accessToken } = useAuth();
  const [wishlistArray, setWishlistArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [isLoading, setIsLoading] = useState(false)


  const { userInfo, setUserInfo } = useUserInfo();
  const { setCartInfo, cartInfo } = useCartInfo();
  const IS_MOBILE = window.innerWidth <= 786

  

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
     setIsLoading(true)
      setWishlistArray(userInfo.wishlist);
      setIsLoading(false);
    }
  }, [userInfo]);

  const removeFromWishlist = async (wishlistId) => {
    try {

      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          wishlistId,
          wishlistAction: "delete",
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserInfo(data.userData);
        setIsLoading(false)
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      setIsLoading(false)
      toast.error("error : ", error);

    }
  };

  const addToCart = async (productId, size) => {
    try {

      
      if (size) {
        setIsLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },

            body: JSON.stringify({
              productId,
              size: size,
            }),
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setCartInfo(data.cart);
          await removeFromWishlist(productId);
        }
      } else {

        
        toast.error(`please select a size`);

      }
    } catch (error) {
      setIsLoading(false);
      toast.error(`error : `, error);
    }
  };

  const handleSize = (e, productId) => {
    setSelectedSize((prev) => ({ ...prev, [productId]: e.target.value }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container className="user-address-box2">
          <Spinner height={IS_MOBILE ? "60vh" : "100%"} width="100%"></Spinner>
        </Container>
      ) : (
        <Container className="user-address-box ">
          <Toaster></Toaster>
          {wishlistArray.length > 0 ? (
            wishlistArray.map((product) => {
              return (
                <Container key={`${product._id}`} className="wishlist-con">
                  <AiOutlineCloseCircle
                    onClick={() => removeFromWishlist(product._id)}
                    className="wishlist-icon"
                  />
                  <Container className="wishlist-img">
                    <img
                      src={`${product?.productImgUrls[0]}`}
                      alt={`${product.name}`}
                    />
                  </Container>

                  <h2>{product.name}</h2>
                  <h3>{product.price}</h3>

                  <select
                    value={selectedSize[product._id]}
                    onChange={(e) => handleSize(e, product._id)}
                    name="size"
                  >
                    <option value="">select size</option>
                    {product.sizes.map((s, i) => (
                      <option value={s} key={`${i}`}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart(product._id, selectedSize[product._id])
                    }
                    className="wishlist-button"
                  >
                    Add to cart
                  </button>
                </Container>
              );
            })
          ) : (
            <Container className="wishlist-con2">
              <h1>Your wishlist is empty</h1>
              <h2>
                Add items that you like to your wishlist. Review them anytime
                and easily move them to the bag.
              </h2>

              <Link to="/" className="link-con">
                Continue Shopping
              </Link>
            </Container>
          )}
        </Container>
      )}
    </>
  );
}
