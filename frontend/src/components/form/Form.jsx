import React, { useState } from "react";
import InputBox from "../ui/inputBox/InputBox";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import Container from "../ui/container/Container";

export default function Form({ btnTitle, formData, handleInput, handleForm, errors }) {
  const [show, setShow] = useState(false);

  const changeShow = () => {
    setShow((prev) => !prev);
  };
  return (
    <form onSubmit={handleForm}>
      <Container className={"inputBox"}>
      <label htmlFor="email">email</label>
      <InputBox
        type="text"
        placeholder="enter your email"
        name="email"
        id="email"
        required
        value={formData.email}
        onChange={handleInput}
      ></InputBox>
       <h3 className="error">{errors.emailError}</h3>
      </Container>
      

     <Container className={"inputBox"}>
     <label htmlFor="password">password</label>
     <Container className={"passwordBox"}>
      <InputBox
        type={!show ? "password" : "text"}
        placeholder="enter your password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleInput}
        required
      ></InputBox>

      {!show ? (
        <VscEye onClick={changeShow} style={{fontSize: "22px"}}/>
      ) : (
        <VscEyeClosed onClick={changeShow} style={{fontSize: "22px"}}/>
      )}
    </Container>
     <h3 className="error">{errors.passwordError}</h3>
     </Container>
      <button type="submit">{btnTitle}</button>
    </form>
  );
}
