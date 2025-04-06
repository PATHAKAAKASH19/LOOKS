import { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import { useUserInfo } from "../../../context/UserInfoContext";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

export default function Wishlist() {

  const {accessToken} = useAuth()
  const [wishlistArray, setWishlistArray] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const { userInfo, setUserInfo } = useUserInfo();

  const SIZES = ["S", "M", "L", "XL", "XXL"];

  
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      setWishlistArray(userInfo.wishlist);
    }
  }, [userInfo]);

  const removeFromWishlist = async (wishlistId) => {
    try {
      const res = await fetch(
        `/api/user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${accessToken}`
          },

          body: JSON.stringify({
            wishlistId,
            wishlistAction: "delete",
          }),
        }
      );

      const data = await res.json();
      console.log(data)
      if (res.status === 200) {
        setUserInfo(data.userData);
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      toast.error("error : ", error);
    }
  };

  const addToCart = async (productId, size) => {
    try {
      if (size) {
        const res = await fetch(
          `/api/cart/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer ${accessToken}`
            },

            body: JSON.stringify({
              productId,
              size,
            }),
          }
        );

        const data = res.json();

        if (res.status === 200) {
          toast.success(`${data.message}`);
          await removeFromWishlist(productId);
        }
      } else {
        toast.error(`please select a size`);
      }
    } catch (error) {
      toast.error(`error : `, error);
    }
  };

  const handleSize = (e) => {
    setSelectedSize(e.target.value);
  };


useEffect(() => {
     window.scrollTo(0, 0);
  }, []);


  return (
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

              <select value={selectedSize} onChange={handleSize}>
                <option value="">select size</option>
                {SIZES.map((s, i) => (
                  <option value={s} key={`${i}`}>
                    {s}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => addToCart(product._id, selectedSize)}
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
            Add items that you like to your wishlist. Review them anytime and
            easily move them to the bag.
          </h2>

          <Link to="/" className="link-con">
            Continue Shopping
          </Link>
        </Container>
      )}
    </Container>
  );
}
