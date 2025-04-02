import React, { useState , useEffect} from "react";
import Container from "../../ui/container/Container";
import InputBox from "../../ui/inputBox/InputBox";
import { LiaUserLockSolid } from "react-icons/lia";
import { Toaster, toast } from "react-hot-toast";
import { validatePassword } from "../../../utils/validate";
import { useAuth } from "../../../context/AuthContext";

export default function ChangePassword() {

  const {accessToken} = useAuth()

  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState({
    password1: "",
    password2: "",
  });

  const handlePassword = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

    setError({
      password1: "",
      password2: "",
    });
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (!password.newPassword) {
        toast.error("Please provide new password");
        return;
      }

      if (!password.confirmNewPassword) {
        toast.error("please provide confirm password");
        return;
      }

      const isPassword1Valid = validatePassword(password.newPassword);
      const isPassword2Valid = validatePassword(password.confirmNewPassword);

      if (isPassword1Valid && isPassword2Valid) {
        if (password.newPassword === password.confirmNewPassword) {
          const res = await fetch(
            `http://192.168.0.104:3000/api/auth/change-password/`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${accessToken}`
              },
              body: JSON.stringify({ newPassword: password.newPassword }),
            }
          );

          const data = await res.json();

          if (res.status === 200) {
            toast.success(`${data.message}`);
            clearState();
            return
          }
        } else {
          toast.error("both password must be same");
          return
        }
      } else {
        handleValidation(isPassword1Valid, isPassword2Valid);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
 }, []);

  return (
    <Container className="user-address-box password-con">
      <Toaster></Toaster>
      <form onSubmit={updatePassword} className="password-form-box">
        <Container className="password-form-title">
          <LiaUserLockSolid style={{ fontSize: "25px" }} />
          <label>Update your password for</label>
          <label>pathakaakash8900@gmail.com</label>
        </Container>

        <Container className="password-form-field">
          <Container className="field">
            <label htmlFor="newPassword">New Password</label>
            <InputBox
              type="text"
              id="newPassword"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePassword}
              placeholder="Enter New Password"
            />

            <div>{error.password1}</div>
          </Container>

          <Container className="field">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <InputBox
              type="text"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={password.confirmNewPassword}
              onChange={handlePassword}
              placeholder="Confirm New Password"
            />
            <div>{error.password2}</div>
          </Container>
        </Container>

        <button type="submit">update password</button>
      </form>
    </Container>
  );
}
