
import InputBox from "../../components/ui/inputBox/InputBox";
import Container from "../../components/ui/container/Container";
import { IoAdd } from "react-icons/io5";

import { useState, useEffect } from "react";
import Title from "../../components/ui/title/Title";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import AddressForm from "../../components/addressForm/AddressForm";
import Spinner from "../../components/ui/spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useCartInfo } from "../../context/cartContext";
import { useUserInfo } from "../../context/UserInfoContext";

export default function CartPage() {


  const navigate = useNavigate()

  const [editUserData, setEditUserData] = useState({
    editEmail: false,
    editAddress: false,
    editPhoneNo: false,
  
  });
 
 const [prevAddressId, setPrevAddressId] = useState("")
  const [selectedAddressId, setSelectedAddressId ] = useState("")
  
  const [amount, setAmount] = useState({
    shippingAmount: "",
    productAmount: "",
    netAmount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
 
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  const [address,setAddress] = useState(null);
  const [addressArray, setAddressArray] = useState([]);

  const {accessToken } = useAuth();
  const {cartInfo, setCartInfo} = useCartInfo()
  const {userInfo, setUserInfo} = useUserInfo()


  const addressObjToString = (address) => {
 
    const addressString = Object.entries(address)
      .filter(([key]) => key !== "_id")
      .map(([, value]) => value)
      .join(", ");
    
    return addressString;
  };

  const checkoutHandler = async (userData, addressArray) => {
    
    try {
     
       if(amount, userData.phoneNo, userData.email, selectedAddressId){
          const deliveryAddress = addressArray.filter((address) => selectedAddressId === address._id )
          const {_id,...address} = deliveryAddress[0]
          
        
         
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/checkout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer ${accessToken}`
            },
    
            body: JSON.stringify({
             address
          })
          });
    
         
          const order = await res.json();
          const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
         
          const options = {
            key:razorpayKey,// Replace with your Razorpay key_id
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Looks Pvt Ltd",
            description: "Test Transction",
            order_id: order.razorpayOrderId, // This is the order_id created in the backend
            handler:async function(response) {
                try {
                  
                  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/verify/${order.orderId}`, {
                    method:"POST",
                    headers:{
                      "Content-Type":"application/json",
                       "Authorization":`Bearer ${accessToken}`
                    },
    
                    body:JSON.stringify(
                      {
                        order_id:response.razorpay_order_id,
                        payment_id:response.razorpay_payment_id,
                        signature:response.razorpay_signature
                      }
                    )
    
                    
                  })

                 
    
                  const data = await res.json()
               
                  if(res.status === 200){
                    navigate(`/paymentSuccess?reference=${data.orderId}`)
                  }else{
                    toast.error("Payment failed, retry")
                  }
                } catch (error) {
                  console.log("Error", error)
                  toast.error(`Please try again`)
                }
            
            }, // Your success URL
            prefill: {
              name: `${userData.name}`, //customer name
              email: `${userData.email}`, //customer gmail
              contact: `${userData.phoneNo}`, //customer contact
            },
    
            notes: {
              orderId: `${order.orderId}`,
              customerId:`${userData._id}`,
            },
            theme: {
              color: "#528FF0",
            },
          };
    
          const razor = new window.Razorpay(options);
          razor.open();
         
        }else {
          toast.error("Please fill email, phoneNo and address")
        }
    } catch (error) {
      console.log("error", error)
      toast.error("Could not initiate payment. Please try again.");
    }
  };

  const changeProductSize = async (productId, size) => {
    try {

   
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
             "Authorization":`Bearer ${accessToken}`
          },
          body: JSON.stringify({
            productId:productId,
            size:size,
            quantity:1
          }),
        }
      );

      const {cart}= await res.json();
   
      if (res.status === 200 && cart !== null) {
       setCartInfo(cart)
       toast.success(`size updated successfully`);

      }else if (cart === null) {
         toast.error(`select different size`)
      }
    } catch (error) {
     
      toast.error("error : ", error);
    }
  };

  const deleteProduct = async (product_id) => {
    try {
     
     
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${accessToken}`
          },

          body: JSON.stringify({
            productId: product_id,
          }),
        }
      );

      const data = await res.json();
   
    if(res.status === 200){
      setCartInfo(data.cart)
      toast.success(`${data.message}`);
    }
    } catch (error) {
      console.log("error", error)
      toast.error("please delete again");
   
    }
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const amountArray = [];
      products.forEach((element) => {
        amountArray.push(element.productId?.price);
      });

      const amount = amountArray.reduce(
        (prevValue, currentValue) => prevValue + currentValue
      );

      if (amount <= 499) {
        setAmount({
          shippingAmount: "inr 150",
          productAmount: `${amount}`,
          netAmount: `${Number(amount) + 150}`,
        });
      } else {
        setAmount({
          shippingAmount: "FREE",
          productAmount: `${amount}`,
          netAmount: `${amount}`,
        });
      }
    }
  }, [products]);

  
  useEffect(() => {

   if(accessToken && cartInfo&& userInfo){
     setIsLoading(true)
  
     const {address, wishlist,...restUserInfo} = userInfo
     setProducts(cartInfo.products)
     setUserData({...restUserInfo})
     setAddressArray(address)
     setSelectedAddressId(userInfo?.address[0]?._id)  
     setIsLoading(false)
    
   }}, [accessToken, cartInfo, userInfo,products])


  const handleEdit = (field, address) => {
    setEditUserData((prev) => {
      return { ...prev, [field]: !prev[field] };
    });

   if(address){
    setAddress(address)
    setPrevAddressId(`${address._id}`)
   }else{
    setAddress(null)
    setPrevAddressId("")
   }


  };

  const handleInput = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const createAddress = async(e) =>{
       try {
        
           e.preventDefault()
          
            const res= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
            method:"PUT",
            headers:{
              "Content-Type":"application/json",
               "Authorization":`Bearer ${accessToken}`
            },

            body:JSON.stringify({
              address,
              addressAction:"save",
             
            })})

        const {userData} = await res.json()
       
         if(res.status === 200){
       
          setAddressArray(userData.address)

          handleEdit("editAddress")
          toast.success("address created successfully")
          setSelectedAddressId(userData.address[0]?._id) 
         }
       } catch (error) {
        toast.error("error:", error)
       }
  } 

  const updateAddress = async(e) => {
    try {
    
      e.preventDefault()
      
      const res= await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${accessToken}`
        },

        body:JSON.stringify({
          address,
          prevAddressId
        })})
         
        const {userData} = await res.json()

        if(res.status ===200){
        
          setUserInfo(userData)
          handleEdit("editAddress")
        
          toast.success("address updated successfully")
        }

    } catch (error) {
      toast.error("error : ", error)
    }
  }
  
  const saveUserInfo = async() => {
     try {
      
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${accessToken}`
        },

        body:JSON.stringify({
          email:userData.email,
          phoneNo:userData.phoneNo
        })
      })

     const data = await res.json()
      
      if(res.status === 200){
        setUserInfo(data.userData)
        toast.success("userInfo save successfully")
      if(editUserData.editEmail){
        handleEdit("editEmail")
      }else{
        handleEdit("editPhoneNo")
      }
      
      }
     } catch (error) {
      toast.error("error : ", error)
     }
  }



   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : 
      products && products.length > 0 ?( <Container className="cart-con">
           <Toaster></Toaster>
        <Container className="cart">
         

     

          <Container className="product-con">
            {products.map((product) => (
              <Container className="product" key={`${product?._id}`}>
                <Container className="imgBox">
                <img src={`${product?.productId?.productImgUrls[0]}`} alt={`${product?.productId?.name}`}/>
                </Container>
                <Container className="product-info">
                <Title
                    title={`${product?.productId?.name.toUpperCase()}`}
                  ></Title>

                  <Container className="size">
                    <label htmlFor="size">SIZE - </label>
                    <select
                      name="size"
                      id="size"
                      value={product?.size?.toUpperCase()}
                      onChange={(e) => changeProductSize(
                          product?._id,
                          e.target.value)
                      }
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XLL">XXL</option>
                    </select>
                  </Container>

                  <Container className="cloth-color">
                    <h3 className="dark">COLOR -</h3>
                    <h3>{product?.productId?.color?.toUpperCase()}</h3>
                  </Container>
                  <Container className="p">
                    <RiDeleteBin6Line
                      className="delete"
                      onClick={() => deleteProduct(product?._id)}
                    />

                    <h3>INR {product?.productId?.price}</h3>
                  </Container>
                </Container>
              </Container>
            ))}
          </Container>
           <Container className="user-info-container">
            <Container className="price-con">
              <Container className="price-sub-div">
                <form className="user-info-con">
                   <Container className="user-info-field-con">
                    <label htmlFor="email-Id">Email</label>
                    <Container className="user-info-field">
                      <InputBox
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleInput}
                        placeholder="enter your email"
                        id="email-Id"
                        disabled={!editUserData.editEmail}
                      ></InputBox>
                      {editUserData.editEmail ? (
                        <button
                          type="button"
                          onClick={() => saveUserInfo()}
                          className="cart-btn"
                        >
                          save
                        </button>
                      ) : (
                        <CiEdit
                          onClick={() => {
                            return handleEdit("editEmail");
                          }}
                          className="cart-icon"
                        />
                      )}
                    </Container>
                  </Container>





                  <Container className="user-info-field-con">
                    <label htmlFor="phoneNo">Phone No</label>
                    <Container className="user-info-field">
                      <InputBox
                        type="text"
                        name="phoneNo"
                        value={userData.phoneNo}
                        onChange={handleInput}
                        placeholder="enter 10 digit phone no"
                        id="phoneNo"
                        disabled={!editUserData.editPhoneNo}
                      />

                      {editUserData.editPhoneNo ? (
                        <button
                          type="button"
                          onClick={() => saveUserInfo()}
                          className="cart-btn"
                        >
                          save
                        </button>
                      ) : (
                        <CiEdit
                          onClick={() => {
                            return handleEdit("editPhoneNo");
                          }}
                          className="cart-icon"
                        />
                      )}
                    </Container>
                  </Container>

                  <Container className="user-info-field-con">
                 <Container className="address-label-con" >
                 <label htmlFor="address">delivery Address</label>
                 <IoAdd className="icon" onClick={() => {
                            return handleEdit("editAddress");
                          }}/>
                 </Container>
                  
                    {
                      (addressArray &&  addressArray.length > 0)? (
                      addressArray.map((address) => (
                        <Container className="user-info-field" key={address._id}>
                        <InputBox
                          type="text"
                          name="address"
                          value={addressObjToString(address)}
                          placeholder="enter your address"
                          disabled={true}
                          id="address"
                        ></InputBox>
                        <CiEdit
                          onClick={() => {
                            return handleEdit("editAddress", address);
                          }}
                          className="cart-icon"
                        />


                      <Container className="radio">

                         <InputBox
      
                           type="radio"
                           name="deliveryAddress"
                           checked={address._id === selectedAddressId}
                           value={address._id}
                           onChange={(e) => setSelectedAddressId(e.target.value)}

                        />
                      </Container>

                     
                      </Container>
                      ))
                      ):null
                    }
                  </Container>
                </form>
              </Container>

              <Container className="sub-con">
                <Container className="discount-box">
                  <InputBox
                    type="text"
                    placeholder="add discount code"
                    name="discount"
                    required={true}
                  ></InputBox>

                  <button
                    
                    
                    className="discount-btn"
                  >apply</button>
                </Container>

                <Container className="sub-total">
                  <h3>subtotal</h3>
                  <h3>inr {amount.productAmount}</h3>
                </Container>

                <Container className="shipping-cost">
                  <h3>shipping cost</h3>
                  <h3>{amount.shippingAmount}</h3>
                </Container>

                <Container className="total">
                  <h2>total</h2>
                  <h2>inr {amount.productAmount}</h2>
                </Container>
              </Container>

              {
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => checkoutHandler(userData, addressArray)}
                >
                  CHECKOUT
                </button>
              }
            </Container>
          </Container>
         
        </Container>

        {editUserData.editAddress && (
          <Container className="address-form-con1">
            <AddressForm
              handleEdit={handleEdit}
              saveAddress={prevAddressId !== ""?updateAddress:createAddress}
              editAddress={prevAddressId !== ""}
              addressObj={address}
              setAddress={setAddress}
            />
          </Container>
        )}
      </Container>) : (
        <Container className="empty-cart">

         
          <h2>Cart is empty add exciting products</h2>
          <Link to="/" className="empty-cart-link">
           <h2>Go to home page </h2>
           
          </Link>

         
        </Container>
      )
      }
    </>
  );
}
