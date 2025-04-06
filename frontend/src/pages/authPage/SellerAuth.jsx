import React, { useState , useEffect} from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/ui/container/Container";
import Form from "../../components/form/Form";
import Title from "../../components/ui/title/Title";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

import { validateEmail, validatePassword, validateRole } from "../../utils/validate";
import { useSellerAuth } from "../../context/SellerAuthContext.jsx";

export default function SellerAuth() {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:""
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    roleError:""
  });

  const { auth } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/seller-dashboard/products";

  const { setSellerToken} = useSellerAuth();
  const {setAccessToken} = useAuth()

  const cleanState = () => {
    setFormData({
      email: "",
      password: "",
      role:""
    });
    setErrors({
      emailError: "",
      passwordError: "",
      roleError:""
    });
  };

  const submitLoginForm = async (e) => {
    try {
      const res = await fetch(`/api/auth/login`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      const data = await res.json();
   
      if (res.status === 401) {
      
        toast.error(`${data.message}`);
      } else if (res.status === 403) {
       
        toast.error(`${data.message}`);
      } else if (res.status === 200) {
      
        setSellerToken(data.accessToken);
        setAccessToken("");
        navigate(`${from}`);
      }

      cleanState();
    } catch (error) {
      cleanState();
      toast.error(`error : ${error}`);
    }
  };

  const submitSignupForm = async (e) => {
    try {
      
      const res = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 401) {
        toast.error(`${data.message}`);
      } else if (res.status === 403) {
        toast.error(`${data.message}`);
      } else {
        navigate(`/seller/login`);
      }
      cleanState();
    } catch (error) {
      cleanState();
      toast.error(`error : ${error}`);
    }
  };

  const handleValidation = (isEmailValid, isPasswordValid, isRoleValid) => {
    if (isEmailValid === false) {
      setErrors((prev) => {
        return {
          ...prev,
          emailError: "Email must be in format: example@domain.com",
        };
      });
    }

    if (isPasswordValid === false) {
      setErrors((prev) => {
        return {
          ...prev,
          passwordError: "Password: ≥8 chars, A-Z, a-z, 0-9, & !@#$%^&*.",
        };
      });
    }

    if(isRoleValid === false){
        setErrors((prev) => {
            return {
              ...prev,
              roleError: "Please select role",
            };
          });
    }
  };

  // this function is used for form submission
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const isEmailValid = validateEmail(formData.email);
      const isPasswordValid = validatePassword(formData.password);
      const  isRoleValid = validateRole(formData.role)
    
     
      if (isEmailValid && isPasswordValid && isRoleValid) {
        if (auth.toLowerCase() === "signup") {
          await submitSignupForm();
        } else if (auth.toLowerCase() === "login") {
          await submitLoginForm();
        }
      } else {
        handleValidation(isEmailValid, isPasswordValid, isRoleValid);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // this function handle the input box data
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

  return (
    <Container className={auth}>
      <Title title={`${auth.toUpperCase()} AS SELLER`} />
      <Container className="box1">
        <Form
          btnTitle={`${auth}`}
          formData={formData}
          handleInput={handleInput}
          handleForm={handleForm}
          errors={errors}
          autoComplete="true"
          SellerAuth={true}

        ></Form>

        {auth === "signup" ? (
          <p>
            or already have an account? <Link to="../login">login</Link>
          </p>
        ) : (
          <p>
            or don&apos;t have an account? <Link to="../signup">signup</Link>
          </p>
        )}
      </Container>
      <Toaster />
    </Container>
  );
}
