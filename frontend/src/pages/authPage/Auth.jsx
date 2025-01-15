import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/ui/container/Container";
import Form from "../../components/form/Form";
import Title from "../../components/ui/title/Title";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../context/userContext";

export default function Auth() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const { auth } = useParams();
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const cleanState = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({
      emailError: "",
      passwordError: "",
    });
  };

  const submitLoginForm = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 401) {
        toast.error(`${data.message}`);
      } else if (res.status === 403) {
        toast.error(`${data.message}`);
      } else if (res.status === 200) {
        setAccessToken(data.accessToken);

        navigate("/");
      }

      cleanState();
    } catch (error) {
      cleanState();
      toast.error(`error : ${error}`);
    }
  };

  const submitSignupForm = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/signup`, {
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
        navigate(`/account/login`);
      }
      cleanState();
    } catch (error) {
      cleanState();
      toast.error(`error : ${error}`);
    }
  };

  const handleValidation = (validation) => {
    if (validation.validateEmail === false) {
      setErrors((prev) => {
        return {
          ...prev,
          emailError: "Email must be in the format: example@domain.com",
        };
      });
    }

    if (validation.validatePassword === false) {
      setErrors((prev) => {
        return {
          ...prev,
          passwordError: "Password: ≥8 chars, A-Z, a-z, 0-9, & !@#$%^&*.",
        };
      });
    }
  };

  // this function is used for form submission
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const validation = validate(formData);

      if (validation.validateEmail && validation.validatePassword) {
        if (auth.toLowerCase() === "signup") {
          await submitSignupForm();
        } else if (auth.toLowerCase() === "login") {
          await submitLoginForm();
        }
      } else {
        handleValidation(validation);
      }
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // this function handle the input box data
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // validate email and password format
  const validate = (formData) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = emailRegex.test(formData.email);
    const validatePassword = passwordRegex.test(formData.password);
    return {
      validateEmail: validateEmail,
      validatePassword: validatePassword,
    };
  };

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
          autoComplete="true"
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
      <Toaster />
    </Container>
  );
}
