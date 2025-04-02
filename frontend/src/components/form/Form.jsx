import React, { useState } from "react";
import InputBox from "../ui/inputBox/InputBox";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import Container from "../ui/container/Container";

export default function Form({
  btnTitle,
  formData,
  handleInput,
  handleForm,
  errors,
  SellerAuth,
  ...rest
}) {
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <form onSubmit={handleForm}>
      <Container className="inputBox">
        <label htmlFor="email">email</label>
        <InputBox
          type="text"
          placeholder="enter your email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleInput}
          {...rest}
        ></InputBox>
        <h3 className="error">{errors.emailError}</h3>
      </Container>

      <Container className="inputBox">
        <label htmlFor="password">password</label>
        <Container className="passwordBox">
          <InputBox
            type={!show ? "password" : "text"}
            placeholder="enter your password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInput}
            {...rest}
            required
          ></InputBox>

          {!show ? (
            <VscEye onClick={changeShow} style={{ fontSize: "22px" }} />
          ) : (
            <VscEyeClosed onClick={changeShow} style={{ fontSize: "22px" }} />
          )}
        </Container>
        <h3 className="error">{errors.passwordError}</h3>
      </Container>

      {
        SellerAuth && (
          <Container className="inputBox">
        <label htmlFor="role">Role</label>
        <select name="role" value={formData.role}  onChange={handleInput} id="role"  className="role">
          <option value="">--select option</option>
          <option value="admin">admin</option>
        </select>
        <h3 className="error">{errors.roleError}</h3>
     
        </Container>
        )
      }
      <button type="submit" className="seller-auth-btn">{btnTitle}</button>
    </form>
  );
}
