import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import toast from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { useSellerAuth } from "../../context/SellerAuthContext";
import { useAuth } from "../../context/AuthContext";
import { useUserInfo } from "../../context/UserInfoContext";
import { useCartInfo } from "../../context/cartContext";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [wishlistProductCount, setWishlistProductCount] = useState("");
  const [cartProductCount, setCartProductCount] = useState("");
  const { sellerToken, setSellerToken } = useSellerAuth();
  const { accessToken, setAccessToken } = useAuth();
  const { userInfo, setUserInfo } = useUserInfo();
  const { cartInfo, setCartInfo } = useCartInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const dropDownRef = useRef();

  const DROPDOWN_NAME = ["Profile", "Address", "Orders", "Change Password"];
  const isMobile = window.innerWidth <= 786;

  useEffect(() => {
    const handleInteraction = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowDropDown(false);
      }
    };

    document.addEventListener("mouseDown", handleInteraction);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (showDropDown && isMobile) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showDropDown, isMobile]);

  const handleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  const navigateToUserDashboard = (route) => {
    if (route !== "Change Password") {
     
      navigate(`/user/${route}`);
      handleDropDown();
    } else {
     navigate(`/user/changePassword`)
      handleDropDown()
    }
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  const navigateToWishlist = () => {
   
    navigate("/user/wishlist", { state: { from: location } });
  };

  const logout = () => {
    setAccessToken("");
    setUserInfo(null);
    setCartInfo(null);
    localStorage.removeItem("userAccessToken");
    toast.success(`user logout successfully`);
    handleDropDown();
  };

  const sellerLogout = () => {
    setSellerToken("");
    localStorage.removeItem("sellerAccessToken");
    toast.success(`seller logout successfully`);
   
  };

  useEffect(() => {
    const countWishlistProduct = () => {
      const count = userInfo.wishlist.length;

      if (count > 0) {
        setWishlistProductCount(`${count}`);
      } else {
        setWishlistProductCount("");
      }
    };

    if (userInfo) {
      countWishlistProduct();
    } else {
      setWishlistProductCount("");
    }
  }, [userInfo]);

  useEffect(() => {
    const countCartProduct = () => {
      const count = cartInfo.products.length;
      if (count > 0) {
        setCartProductCount(`${count}`);
      } else {
        setCartProductCount("");
      }
    };

    if (cartInfo) {
      countCartProduct();
    } else {
      setCartProductCount("");
    }
  }, [cartInfo]);

  useEffect(() => {
    const fetchCartInfo = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setCartInfo(data.cart);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setUserInfo(data.userData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (accessToken) {
      fetchCartInfo();
      fetchUserInfo();
    } else if (sellerToken) {
      setCartInfo(null);
      setUserInfo(null);
    }
  }, [accessToken, sellerToken, setCartInfo, setUserInfo]);

  const navigateToLoginPage = () => {
    navigate("/account/login");
    handleDropDown();
  };

  return (
    <div className="navbar">
      <div>
        <Link className="link-con" to="/">
          <h2 className="logo">LOOKS</h2>
        </Link>
      </div>
      <div className="subnav1"></div>

      <div className="subnav2">
        <div>
          {!sellerToken && (
            <div
              className="header-div"
              onClick={handleDropDown}
              ref={dropDownRef}
            >
              <FiUser className="icon" />
            </div>
          )}

          {showDropDown && !sellerToken && (
            <>
              <div
                className="dropDown-box"
                onMouseLeave={!isMobile ? handleDropDown : undefined}
              >
                <ul>
                  {DROPDOWN_NAME.map((name, i) => (
                    <li key={i} onClick={() => navigateToUserDashboard(name)}>
                      {name}
                    </li>
                  ))}
                  {accessToken ? (
                    <li onClick={logout}>Logout</li>
                  ) : (
                    <li onClick={navigateToLoginPage}>Login</li>
                  )}

                  {isMobile && (
                    <li
                      className="go-back-btn1"
                      onClick={isMobile ? handleDropDown : undefined}
                    >
                      <button className="header-div">
                        <BsArrowRight className="go-back-icon" />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}

          {sellerToken && (
            <button onClick={sellerLogout} className="seller-btn">
              Logout
            </button>
          )}
        </div>

        {!sellerToken && (
          <>
            <div className="header-div" onClick={() => navigateToWishlist()}>
              <MdFavoriteBorder className="icon heart" />
              {wishlistProductCount && (
                <div className="wishlist-count-con">
                  <h3 className="wishlist-count">{wishlistProductCount}</h3>
                </div>
              )}
            </div>
            <div className="header-div" onClick={() => navigateToCart()}>
              <IoCartOutline className="icon" />
              {cartProductCount !== "" && (
                <div className="wishlist-count-con">
                  <h3 className="wishlist-count">{cartProductCount}</h3>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
