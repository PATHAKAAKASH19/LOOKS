import React, { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import { LuMapPin } from "react-icons/lu";
import { useUserInfo } from "../../../context/UserInfoContext";
import { useAuth } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import AddressForm from "../../addressForm/AddressForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

export default function UserAddress() {

 
  const [address, setAddress] = useState({
    addressLine: "",
    locality: "",
    city: "New York",
    state: "",
    country: "USA",
    zipCode: "",
  });

  const [addressArray, setAddressArray] = useState(null);
  const [hideAndShow, setHideAndShow] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [prevAddressId, setPrevAddressId] = useState("");

  const { userInfo, setUserInfo } = useUserInfo();

  const {accessToken} = useAuth();

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      setAddressArray(userInfo.address);
    }
  }, [userInfo]);

  const handleHideAndShow = () => {
    setHideAndShow((prev) => !prev);

    setAddress({
      addressLine: "",
      locality: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      
    });

    setEditAddress(false);
  };

  const saveAddress = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${accessToken}`
          },

          body: JSON.stringify({ address, addressAction: "save" }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        setUserInfo(data.userData);
        handleHideAndShow();

        toast.success(`${"address created successfully"}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const updateAddress = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${accessToken}`
          },

          body: JSON.stringify({
            prevAddressId,
            address,
          }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        setUserInfo(data.userData);
        handleHideAndShow();
        toast.success(`${"address created successfully"}`);
      }
    } catch (error) {
      toast.error("error : ", error);
    }
  };

  const convertAddressToString = (addressObj) => {
    const addressString = Object.entries(addressObj)
      .filter(([field]) => field !== "default" && field !== "_id")
      .map(([, value]) => value)
      .join(", ");
    return addressString;
  };

  const deleteAddress = async (e, address) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${accessToken}`
          },

          body: JSON.stringify({
            address,
            addressAction: "delete",
          }),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        toast.success("address deleted successfully");
        setUserInfo(data.userData);
      }
    } catch (error) {
      toast.error("unable to delete!! Please try again");
    }
  };

  const editAddressData = (e, addressObj) => {
    handleHideAndShow();
    setAddress((prev) => ({ ...prev, ...addressObj }));
    setEditAddress(true);
    setPrevAddressId(addressObj._id);
  };


  useEffect(() => {
       window.scrollTo(0, 0);
    }, []);
  
  return (
    <Container className="user-address-box">
      <Toaster></Toaster>
      {!hideAndShow && (
        <>
          <Container className="address-icon-box">
            <LuMapPin onClick={handleHideAndShow} className="address-icon" />
            <h1 onClick={handleHideAndShow}>Add new address</h1>
          </Container>

          {addressArray &&
            addressArray.map((addressObj, i) => (
              <Container
                className="address-icon-box"
                key={`${addressObj.zipCode}_${i}`}
              >
                <AiOutlineCloseCircle
                  onClick={(e) => deleteAddress(e, addressObj)}
                  className="address-icon2"
                />
                <h4 className="address-info">
                  {convertAddressToString(addressObj)}
                </h4>

                <CiEdit
                  className="edit-button"
                  onClick={(e) => editAddressData(e, addressObj)}
                />
              </Container>
            ))}
        </>
      )}

      {hideAndShow && (
        <AddressForm
          handleHideAndShow={handleHideAndShow}
          setAddress={setAddress}
          saveAddress={editAddress ? updateAddress : saveAddress}
          addressObj={address}
          editAddress={editAddress}
        />
      )}
    </Container>
  );
}
