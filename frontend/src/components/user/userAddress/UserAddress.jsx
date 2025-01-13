import React, { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import InputBox from "../../ui/inputBox/InputBox";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { LuMapPin } from "react-icons/lu";

export default function UserAddress() {
  const [address, setAddress] = useState({
    addressLine: "",
    locality: "",
    city: "New York",
    state: "",
    country: "USA",
    zipCode: "",
    default: false,
  });

  const [addressData, setAddressData] = useState(null);
  const [hideAndShow, setHideAndShow] = useState(false);

  const indianStatesAndUTs = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const countries = ["India"];

  const handleInput = (e) => {
    if (e.target.name === "default") {
      setAddress((prev) => ({ ...prev, default: e.target.checked }));
    } else {
      setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleHideAndShow = () => {
    setHideAndShow((prev) => !prev);
  };

  const handleForm = () => {};

  return (
    <Container>
      {!hideAndShow && (
        <Container>
          <LuMapPin onClick={handleHideAndShow} />
        </Container>
      )}

      {hideAndShow && (
        <form onSubmit={handleForm}>
          <AiOutlineCloseCircle onClick={handleHideAndShow} />

          <Container>
            <label htmlFor="addressLine">Address Line</label>
            <InputBox
              type="text"
              name="addressLine"
              value={address.addressLine}
              onChange={handleInput}
              className="input"
              id="addressLine"
            />
          </Container>

          <Container>
            <label htmlFor="locality">Locality</label>
            <InputBox
              type="text"
              name="locality"
              value={address.locality}
              onChange={handleInput}
              className="input"
              id="locality"
            />
          </Container>

          <Container>
            <label htmlFor="city">city</label>
            <InputBox
              type="text"
              name="city"
              value={address.city}
              onChange={handleInput}
              className="input"
              id="city"
            />
          </Container>

          <Container>
            <label htmlFor="state">state</label>

            <select
              id="state"
              value={address.state}
              name="state"
              onChange={handleInput}
            >
              <option value="" disabled>
                select an option
              </option>

              {indianStatesAndUTs.map((state, i) => {
                return (
                  <option key={i} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
          </Container>

          <Container>
            <label htmlFor="country">country</label>
            <select
              id="country"
              value={address.country}
              onChange={handleInput}
              name="country"
            >
              <option value="" disabled>
                select an option
              </option>
              {countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </Container>

          <Container>
            <label htmlFor="zipCode">Postal / Zip Code</label>
            <InputBox
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleInput}
              className="input"
              id="zipCode"
            />
          </Container>

          <Container>
            <label htmlFor="default">Default</label>
            <InputBox
              type="checkbox"
              name="default"
              checked={address.default}
              onChange={handleInput}
              className="input"
              id="default"
            />
          </Container>

          <button type="submit">Save</button>
        </form>
      )}
    </Container>
  );
}
