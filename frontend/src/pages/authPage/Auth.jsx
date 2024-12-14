import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/ui/container/Container";
import Form from "../../components/form/Form";
import Title from "../../components/ui/title/Title";

export default function Auth() {

  // use to store the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });




  // use to store the error data
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError:""
  });

  // this hook is use to extract the route params 
  const { auth } = useParams();

  // this hook is use to naviagete between pages
  const navigate = useNavigate();




  // this function is used for form submission
  const handleForm = async (e) => {

    // prevent default behaviour of form tag
    e.preventDefault();

    // set the error
    setErrors({
      emailError:"",
      passwordError:"",
    })

    // return an object 
    const validation = validate(formData)

    if(validation.validateEmail && validation.validatePassword){
     
      try {

        // send user form data to backend
        const res = await fetch(
          `http://localhost:3000/api/auth/${auth.toLowerCase()}`,
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        
        const data = await res.json();
        if (auth.toLowerCase === "signup" && res.ok) {
          setFormData({
            email: "",
            password: "",
          });
          navigate("../login");
        } else if (auth.toLowerCase === "login" && res.ok) {
          setFormData({
            email: "",
            password: "",
          });
          navigate("../../home");
        } else {
          setFormData({
            email: "",
            password: "",
          });
          alert(`error: ${res.error}`);
          navigate(`../${auth}`);
        }
      } catch (error) {
        console.log("error : ", error);
      }
    }else {
      if(validation.validateEmail === false) {
        
        setErrors(prev => {return {...prev, emailError: "please enter valide email format"}})
      }

     if(validation.validatePassword === false) {
        setErrors(prev => {return {...prev, passwordError: "please enter valide password format"}})
     }
    }

   
  };


  // this function handle the input box data
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  // validate email and password format
  const validate = (formData) => {

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex =   /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
   const validateEmail = emailRegex.test(formData.email)
   const validatePassword = passwordRegex.test(formData.password)
    return {
      validateEmail: validateEmail,
      validatePassword: validatePassword
    }
  }

  return (
    <Container className={auth}>
      <Title title={`${auth.toUpperCase()} WITH EMAIL`} />
      <Container className="box1">
        <Form
          btnTitle={`${auth}`}
          formData={formData}
          handleInput={handleInput}
          handleForm={handleForm}
          errors={errors}
        ></Form>

        {auth === "signup" ? (
          <p>
            or already have an account? <Link to="../login">login</Link>
          </p>
        ) : (
          <p>
            or don't have an account? <Link to="../signup">signup</Link>
          </p>
        )}
      </Container>
    </Container>
  );
}
