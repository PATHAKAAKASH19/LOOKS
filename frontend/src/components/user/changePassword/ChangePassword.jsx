import React, { useState } from "react";
import Container from "../../ui/container/Container";
import InputBox from "../../ui/inputBox/InputBox";
import { LiaUserLockSolid } from "react-icons/lia";
import { Toaster, toast } from "react-hot-toast";
import { validatePassword } from "../../../utils/validate";

export default function ChangePassword() {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePassword = (e) => {
    setPassword((prev) => ({ ...prev, [e.targert.name]: e.target.value }));
  };

  const [error, setError] = useState({
    password1: "",
    password2: "",
  });

  const handleValidation = (isPassword1Valid, isPassword2Valid) => {
    if (isPassword1Valid === false) {
      setError((prev) => {
        return {
          ...prev,
          password1: "Password: ≥8 chars, A-Z, a-z, 0-9, & !@#$%^&*.",
        };
      });
    }

    if (isPassword2Valid === false) {
      setError((prev) => {
        return {
          ...prev,
          password2: "Password: ≥8 chars, A-Z, a-z, 0-9, & !@#$%^&*.",
        };
      });
    }
  };

  const clearState = () => {
    setPassword({
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const isPassword1Valid = validatePassword(password.newPassword);
      const isPassword2Valid = validatePassword(password.confirmNewPassword);

      if (isPassword1Valid && isPassword2Valid) {
        if (password.newPassword === password.confirmNewPassword) {
          const res = await fetch(`https://localhost:3000/api/auth/password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(object),
          });

          if (res.status === 200) {
            clearState();
            toast.success("password updated succefully");
          }
        } else {
          clearState();
          toast.error("both password should be same");
        }
      } else {
        clearState();
        handleValidation(isPassword1Valid, isPassword2Valid);
      }
    } catch (error) {}
  };

  return (
    <Container className="user-profile-box password-con">
      <Toaster></Toaster>
      <form onSubmit={updatePassword} className="password-form-box">
        <Container className="password-form-title">
          <LiaUserLockSolid />
          <label>Update your password for</label>
          <label>pathakaakash8900@gmail.com</label>
        </Container>

       <Container>
       <Container className="password-form">
          <label htmlFor="newPassword">New Password</label>
          <InputBox
            type="text"
            id="newPassword"
            name="newPassword"
            value={password.newPassword}
            onChange={handlePassword}
            placeholder="Enter New Password"
          />

          <label>{error.password1}</label>
        </Container>

        <Container>
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <InputBox
            type="text"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={password.confirmNewPassword}
            onChange={handlePassword}
            placeholder="Confirm New Password"
          />
          <label>{error.password2}</label>
        </Container>
       </Container>

       
        
          <button type="submit">update password</button>
       
      </form>
    </Container>
  );
}
