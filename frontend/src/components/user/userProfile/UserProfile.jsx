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
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUserForm = async () => {
    try {
      e.preventDefault();
      const res = fetch("http://localhost:3000/api/user");
    } catch (error) {}
  };

  return (
    <Container className="user-profile-box">
      {disabled ? (
        <CiEdit onClick={handleFormEdit} className="edit-icon" />
      ) : (
        <AiOutlineCloseCircle onClick={handleFormEdit} className="edit-icon" />
      )}
      <form onSubmit={handleUserForm}>
        <Container className="flex-box">
          <label htmlFor="firstName">First Name</label>
          <InputBox
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInput}
            disabled={disabled}
            id="firstName"
          />
        </Container>
        <Container className="flex-box">
          <label htmlFor="lastName">Last Name</label>
          <InputBox
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInput}
            disabled={disabled}
            id="lastName"
          />
        </Container>
        <Container className="flex-box">
          <label htmlFor="email1">Email</label>
          <InputBox
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInput}
            disabled={disabled}
            id="email1"
          />
        </Container>
        <Container className="flex-box">
          <label htmlFor="contactNo">Contact No</label>
          <InputBox
            type="text"
            name="contactNo"
            value={userData.contactNo}
            onChange={handleInput}
            disabled={disabled}
            id="contactNo"
          />
        </Container>

        {!disabled && (
         
            <button type="submit">Save</button>
         
        )}
      </form>
    </Container>
  );
}
