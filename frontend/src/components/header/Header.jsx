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

  

  

  

  const handleDropDown = () => {
    setShowDropDown(prev => !prev)
  } 

 
  const navigateToUserDashboard = (route) => {
      navigate(`/user/${route}`)
      handleDropDown()

  }


  

  const logout = () => {
      setAccessToken("")
      setUserInfo(null)
      setCartInfo(null)
      localStorage.removeItem("userAccessToken")
      toast.success(`user logout successfully`)
      handleDropDown()
  }


  const sellerLogout = () => {
      setSellerToken("")
      localStorage.removeItem("sellerAccessToken")
      toast.success(`seller logout successfully`)
      handleDropDown()
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
    }else{
      setWishlistProductCount("")
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
    }else{
      setCartProductCount("")
    }
  }, [cartInfo])

  

  useEffect(() => {

    const fetchCartInfo = async() => {
     
      try {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
          
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
       
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



 const navigateToLoginPage =  () => {
  navigate("/account/login")
  handleDropDown()
 }
 



 

 
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
       
      <div onClick={handleDropDown}>
    
     {(!sellerToken ) && (<FiUser className="icon"/>)}
     
      
     {
      (showDropDown&& !sellerToken) && (
     
        
        <div className="dropDown-box" onClick={handleDropDown}>

        <ul>
          {
            DROPDOWN_NAME.map((name, i) => <li key={i} onClick={() => navigateToUserDashboard(name)}>{name}</li>)
          }
         {
          accessToken ?  <li onClick={logout}>Logout</li>:<li onClick={navigateToLoginPage}>Login</li>
         }
          
         {(window.innerWidth <= 700) &&( <li className="go-back-btn1" onClick={handleDropDown}><div>
         <BsArrowRight className="go-back-icon"/> </div></li>)}
        </ul>

       
      
      </div>
    
      )
     }


       {
         (sellerToken) && (
           
           
              <button onClick={sellerLogout} className="seller-btn">Logout</button>
          
         
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

