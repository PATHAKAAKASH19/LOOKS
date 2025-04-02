import React, { useEffect, useState } from "react";
import Container from "../../components/ui/container/Container";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBagCheck } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { useUserInfo } from "../../context/UserInfoContext";
import Spinner from "../../components/ui/spinner/Spinner";


export default function UserPage() {
  const {setUserInfo} = useUserInfo();
  const [isLoading, setIsLoading] = useState(true);
  const {accessToken} = useAuth();
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://192.168.0.104:3000/api/user/`,
          {
            method: "GET",
            headers:{
              "Authorization":`Bearer ${accessToken}`,
            }
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setUserInfo(data.userData);
         
        }else if(res.status === 403){
             navigate(`/account/login`, {state:{from: location}})
            
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

   if(accessToken){
    fetchUserData();
   }else {
    navigate(`/account/login`, {state:{from: location}})
   }
  }, []);


   useEffect(() => {
     window.scrollTo(0, 0);
    }, []);

  return (
    <>
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <Container className="user-box">
          <Container className="user-sub-box">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active-link"
              }
            >
              <CgProfile className="user-sub-box-icon" />
              <h1 className="h1">Profile</h1>
            </NavLink>

            <NavLink
              to="address"
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active-link"
              }
            >
              <IoLocationOutline className="user-sub-box-icon" />
              <h1 className="h1">Address</h1>
            </NavLink>

            <NavLink
              to="wishlist"
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active-link"
              }
            >
              <IoMdHeartEmpty className="user-sub-box-icon" />
              <h1 className="h1">Wishlist</h1>
            </NavLink>

            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active-link"
              }
            >
              <BsBagCheck className="user-sub-box-icon" />
              <h1 className="h1">My Orders</h1>
            </NavLink>

            <NavLink
              to="changePassword"
              className={({ isActive }) =>
                isActive ? "active-link" : "not-active-link"
              }
            >
              <RiLockPasswordLine className="user-sub-box-icon" />
              <h1 className="h1">Change Password</h1>
            </NavLink>
          </Container>

          <Outlet />
        </Container>
      )}
    </>
  );
}
