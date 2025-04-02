import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import toast,{ Toaster } from "react-hot-toast";
import { BsArrowRight } from "react-icons/bs";
import { useSellerAuth } from "../../context/SellerAuthContext";
import { useAuth } from "../../context/AuthContext";
import { useUserInfo } from "../../context/UserInfoContext";
import { useCartInfo } from "../../context/cartContext";


export default function Header() {

  const [showDropDown, setShowDropDown] = useState(false)
  const [wishlistProductCount, setWishlistProductCount] = useState("")
  const [cartProductCount, setCartProductCount] = useState("")
  const {sellerToken, setSellerToken} = useSellerAuth()
  const {accessToken, setAccessToken} = useAuth()
  const {userInfo} = useUserInfo()
  const {cartInfo} = useCartInfo()
  const navigate = useNavigate()

  

  const handleEnter = () => {
    setShowDropDown(true)
  }

  const handleLeave = () => {
    setShowDropDown(false)
  }


  const handleTouchStart = () => {
    setShowDropDown(true);
  };

  const handleTouchEnd = () => {
    setShowDropDown(false);
  };

 
  const navigateToUserDashboard = (route) => {
      navigate(`/user/${route}`)
  }


  const logout = async(e) => {

    try {
      
      const res = await fetch(`http://192.168.0.104:3000/api/auth/logout`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${accessToken}`
        }
      })

      const data = await res.json()

      if(res.status === 200){
        toast.success(`${data.message}`)
        setAccessToken("")
      }
    } catch (error) {
      toast.error("error : ", error)
    }
  }


  const sellerLogout = async(e) => {
    try {
      
      const res = await fetch(`http://192.168.0.104:3000/api/auth/logout`, {
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${sellerToken}`
        }
      })

      const data = await res.json()

      if(res.status === 200){
        toast.success(`${data.message}`)
        setSellerToken("")
        
      }
    } catch (error) {
      toast.error("error : ", error)
    }
  }
  
  const DROPDOWN_NAME = ["profile", "address", "orders", "changePassword"]


  useEffect(() => {

    const countWishlistProduct = () => {
        const count = userInfo.wishlist.length
        setWishlistProductCount(`${count}`)
    }

    if(userInfo){
      countWishlistProduct()
    }
  }, [userInfo])


  useEffect(() => {


    const countCartProduct = () =>{ 
      console.log(cartInfo)
      const count = cartInfo.products.length
      setCartProductCount(`${count}`)
    }

    if(cartInfo){
      countCartProduct()
    }
  }, [cartInfo])

  return (
    <div className="navbar">
      <div>
        <Link className="link-con" to="/">
          <h2 className="logo">LOOKS</h2>
        </Link>
      </div>
      <div className="subnav1">
     {
      (!sellerToken) && (
        <ul className="header-link">
      
      </ul>
      )
     }
      </div>

      <div className="subnav2" >
       
      <div onMouseEnter={handleEnter}  onMouseLeave={handleLeave} onTouchStart={handleTouchStart}>
    
     {(!sellerToken ) && (<FiUser className="icon"/>)}
     
      
     {
      (showDropDown&& !sellerToken) && (
     
        
        <div className="dropDown-box" onClick={handleLeave}>

        <ul>
          {
            DROPDOWN_NAME.map((name, i) => <li key={i} onClick={(e) => navigateToUserDashboard(name)}>{name}</li>)
          }
          <li onClick={logout}>LogOut</li>
          
         {(window.innerWidth <= 700) &&( <li className="go-back-btn1" onClick={handleTouchEnd}><div>
         <BsArrowRight className="go-back-icon"/> </div></li>)}
        </ul>

       
      
      </div>
    
      )
     }


       {
         (sellerToken) && (
           
           
              <button onClick={sellerLogout} className="seller-btn">LogOut</button>
          
         
          )
        }
      </div>







    {
      !sellerToken && (   
        <>
          <Link to="/user/wishlist" className="wishlist-link">
            <MdFavoriteBorder className="icon heart"/>
          {
            (wishlistProductCount !== "") && (
              <div className="wishlist-count-con">
             <h3 className="wishlist-count">{wishlistProductCount}</h3>
             </div>
            )
          }
         
          </Link>
          <Link  to="/cart" className="wishlist-link">
            <IoCartOutline className="icon" />
         {
            (cartProductCount !== "") && (<div className="wishlist-count-con">
             <h3 className="wishlist-count">{cartProductCount}</h3>
             </div>)
         }
          </Link>
      </>
      )
    }
      </div>
    </div>
  );
}

