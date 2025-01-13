import React, { useState } from "react";
import Container from "../../ui/container/Container";
import InputBox from "../../ui/inputBox/InputBox";
import { CiEdit } from "react-icons/ci";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function UserProfile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contatcNo: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleFormEdit = () => {
    setDisabled((prev) => !prev);
  };

  const handleInput = (e) => {
    if (e.target.value) {
      setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleUserForm = async () => {
    try {
      e.preventDefault();
      const res = fetch("http://localhost:3000/api/user");
    } catch (error) {}
  };

  return (
    <Container className="right-box">
      <form onSubmit={handleUserForm}>
        <Container>
          <label htmlFor="firstName">First Name</label>
          <InputBox
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInput}
            disabled={disabled}
            className="input"
            id="firstName"
          />
        </Container>
        <Container>
          <label htmlFor="lastName">Last Name</label>
          <InputBox
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInput}
            disabled={disabled}
            className="input"
            id="lastName"
          />
        </Container>
        <Container>
          <label htmlFor="email">Email</label>
          <InputBox
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInput}
            disabled={disabled}
            className="input"
            id="email"
          />
        </Container>
        <Container>
          <label htmlFor="contactNo">Contact No</label>
          <InputBox
            type="text"
            name="contactNo"
            value={userData.contatcNo}
            onChange={handleInput}
            disabled={disabled}
            className="input"
            id="contactNo"
          />
        </Container>
        {disabled ? (
          <CiEdit onClick={handleFormEdit} />
        ) : (
          <AiOutlineCloseCircle onClick={handleFormEdit} />
        )}
        {!disabled && <button type="submit">Save</button>}
      </form>
    </Container>
  );
}
