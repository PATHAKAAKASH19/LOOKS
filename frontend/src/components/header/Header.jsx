import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const [showDropDown, setShowDropDown] = useState(false)
  const [wishlistProductCount, setWishlistProductCount] = useState("")
  const [cartProductCount, setCartProductCount] = useState("")
  const {sellerToken, setSellerToken} = useSellerAuth()
  const {accessToken, setAccessToken} = useAuth()
  const {userInfo,setUserInfo} = useUserInfo()
  const {cartInfo, setCartInfo} = useCartInfo()
  const navigate = useNavigate()
  const DROPDOWN_NAME = ["profile", "address", "orders", "changePassword"]

  

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


  const logout = async() => {

    try {
      
      const res = await fetch(`/api/auth/logout`, {
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
      console.log("error", error)
      toast.error("error : ", error)
    }
  }


  const sellerLogout = async() => {
    try {
      
      const res = await fetch(`/api/auth/logout`, {
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
  
  


  useEffect(() => {

    const countWishlistProduct = () => {
        const count = userInfo.wishlist.length
        
      if(count > 0){
        setWishlistProductCount(`${count}`)
      }else{
        setWishlistProductCount("")
      }
    }

    if(userInfo){
     countWishlistProduct()
    }
  }, [userInfo])


  useEffect(() => {


    const countCartProduct = () =>{ 
      
      const count = cartInfo.products.length
      if(count > 0){
        setCartProductCount(`${count}`)
      }else{
        setCartProductCount("")
      }
    
    }

    if(cartInfo){
      countCartProduct()
    }
  }, [cartInfo])

  

  useEffect(() => {

    const fetchCartInfo = async() => {
     
      try {
         const res = await fetch(`/api/cart`, {
          
            method: "GET",
            headers:{
              "Authorization":`Bearer ${accessToken}`,
            }
          
         })
  
         const data = await res.json()
  
         if(res.status === 200){
          setCartInfo(data.cart)
  
         }
      } catch (error) {
        console.log("error", error)
      }
    }
  
    const fetchUserInfo = async() => {
      
      try {
      const res = await fetch(`/api/user`, {
       
         method: "GET",
         headers:{
           "Authorization":`Bearer ${accessToken}`,
         }
       
      })
  
      const data = await res.json()
  
      if(res.status === 200){
       setUserInfo(data.userData)
  
      }
   } catch (error) {
     console.log("error", error)
   }
  }
    

    if(accessToken){
      fetchCartInfo()
      fetchUserInfo()
      
    }else if(sellerToken){
      setCartInfo(null)
      setUserInfo(null)
    }

  }, [accessToken, sellerToken,setCartInfo, setUserInfo])

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
            DROPDOWN_NAME.map((name, i) => <li key={i} onClick={() => navigateToUserDashboard(name)}>{name}</li>)
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
            (wishlistProductCount) && (
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

