import { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import { LuMapPin } from "react-icons/lu";
import { useUserInfo } from "../../../context/UserInfoContext";
import { useAuth } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import AddressForm from "../../addressForm/AddressForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Spinner from "../../ui/spinner/Spinner";

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
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo, setUserInfo } = useUserInfo();

  const IS_MOBILE = window.innerWidth <= 786;

  const { accessToken } = useAuth();

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      setIsLoading(true);
      setAddressArray(userInfo.address);
      setIsLoading(false);
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
      setIsLoading(true);
      e.preventDefault();

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({ address, addressAction: "save" }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserInfo(data.userData);
        handleHideAndShow();
        toast.success(`${"address created successfully"}`);
        setIsLoading(false);
      }
    } catch (error) {
      
      toast.error(`${error}`);
      setIsLoading(false);
    }
  };

  const updateAddress = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          prevAddressId,
          address,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserInfo(data.userData);
        handleHideAndShow();
        toast.success(`${"address created successfully"}`);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("error : ", error);
      setIsLoading(false);
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
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({
          address,
          addressAction: "delete",
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setUserInfo(data.userData);
        setIsLoading(false);
        toast.success("address deleted successfully");
      }
    } catch (error) {
      setIsLoading(false);
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
    <>
      {isLoading ? (
        <Container className="user-address-box2">
          <Spinner height={IS_MOBILE ? "60vh" : "100%"} width="100%"></Spinner>
        </Container>
      ) : (
        <Container className="user-address-box">
          <Toaster></Toaster>

          {!hideAndShow && (
            <>
              <Container className="address-icon-box">
                <LuMapPin
                  onClick={handleHideAndShow}
                  className="address-icon"
                />
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
      )}
    </>
  );
}
