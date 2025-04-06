
import Container from "../ui/container/Container";
import InputBox from "../ui/inputBox/InputBox";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function AddressForm({
  handleHideAndShow,
  handleEdit,
  saveAddress,
  addressObj,
  setAddress,
  editAddress,
}) {
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
      setAddress((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <form onSubmit={saveAddress} className="address-form">
      <AiOutlineCloseCircle
        onClick={
          handleHideAndShow
            ? handleHideAndShow
            : () => {
                handleEdit("editAddress",);
              }
        }

        className="address-form-icon"
      />

      <Container className="address-form-field-con">
        <Container className="address-form-field">
          <label htmlFor="addressLine">Address Line</label>
          <InputBox
            type="text"
            name="addressLine"
            value={addressObj?.addressLine || ""}
            onChange={handleInput}
            className="input"
            id="addressLine"
          />
        </Container>

        <Container className="address-form-field">
          <label htmlFor="locality">Locality</label>
          <InputBox
            type="text"
            name="locality"
            value={addressObj?.locality || ""}
            onChange={handleInput}
            className="input"
            id="locality"
          />
        </Container>
      </Container>

      <Container className="address-form-field-con">
        <Container className="address-form-field">
          <label htmlFor="city">city</label>
          <InputBox
            type="text"
            name="city"
            value={addressObj?.city || ""}
            onChange={handleInput}
            className="input"
            id="city"
          />
        </Container>

        <Container className="address-form-field">
          <label htmlFor="state">state</label>

          <select
            id="state"
            value={addressObj?.state || ""}
            name="state"
            onChange={handleInput}
          >
            <option value="" disabled>
              select an option
            </option>

            {indianStatesAndUTs.map((state, i) => {
              return (
                <option key={`${state}_${i}`} value={state}>
                  {state}
                </option>
              );
            })}
          </select>
        </Container>
      </Container>

      <Container className="address-form-field-con">
        <Container className="address-form-field">
          <label htmlFor="country">country</label>
          <select
            id="country"
            value={addressObj?.country || ""}
            onChange={handleInput}
            name="country"
          >
            <option value="" disabled>
              select an option
            </option>
            {countries.map((country, i) => (
              <option key={`${country}_${i}`} value={country}>
                {country}
              </option>
            ))}
          </select>
        </Container>

        <Container className="address-form-field">
          <label htmlFor="zipCode">Postal / Zip Code</label>
          <InputBox
            type="text"
            name="zipCode"
            value={addressObj?.zipCode || ""}
            onChange={handleInput}
            className="input"
            id="zipCode"
          />
        </Container>
      </Container>

      
      
        <Container className="address-submit-btn">
          {editAddress ? (
            <button type="submit">update</button>
          ) : (
            <button type="submit">create</button>
          )}
        </Container>
    
    </form>
  );
}
