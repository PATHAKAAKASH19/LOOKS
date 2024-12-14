import React, { useEffect, useState } from "react";
import InputBox from "../ui/inputBox/InputBox";
import Container from "../ui/container/Container";
import Title from "../ui/title/Title";

export default function CreateCategory() {
  const [form, setFrom] = useState({
    category: "",
    trending: false,
    subCategory: "",
  });

  const [image, setImage] = useState(null);

  const [categoryData, setCategoryData] = useState(null);

  // handle text input box
  const handleTextInput = (e) => {
    console.log(e.target.value);
    setFrom((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(form);
  };

  // handle files input box
  const handleImageInput = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.prevantDefault();

    try {
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/category/get");
        const categoryData = await response.json();

        if (categoryData) {
          setCategoryData(categoryData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getAllCategory();
  }, []);
  return (
    <Container className="admin-panel">
      <Container className="create-category">
        <form onSubmit={handleFormSubmit}>
          <Container className="input">
            <label htmlFor="category" style={{ alignSelf: "center" }}>
              category
            </label>
            <InputBox
              id="category"
              type="text"
              name="category"
              value={form.category}
              onChange={handleTextInput}
              placeholder="enter category name"
            ></InputBox>
          </Container>

          <Container className="input">
            <label htmlFor="trending" style={{ alignSelf: "center" }}>
              trending
            </label>
            <select id="trending" name="trending" onChange={handleTextInput}>
              <option value={false}>false</option>
              <option value={true}>true</option>
            </select>
          </Container>

          <Container className="input">
            <label htmlFor="sub-category" style={{ alignSelf: "center" }}>
              subCategory
            </label>
            <select
              id="sub-category"
              name="subCategory"
              onChange={handleTextInput}
            >
              <option value="topwear">topwear</option>
              <option value="bottomwear">bottomwear</option>
              <option value="accessories">accessories</option>
              <option value="footwear">footwear</option>
              <option value="watches">watches</option>
            </select>
          </Container>

          <Container className="upload" style={{ alignSelf: "center" }}>
            <label>
              upload category image
              <InputBox
                type="file"
                name="image"
                value={image ? image : undefined}
                onChange={handleImageInput}
                placeholder="upload a image"
                className="uploadbox"
              ></InputBox>
            </label>
          </Container>

          <button type="submit">submit</button>
        </form>
      </Container>
      <Container className="show-category">
        <Container className="heading">
          <Title title="category" />
          <Title title="subCategory" />
          <Title title="trending" />
          <Title title="categoryImg" />
          <Title title="Action"></Title>
        </Container>

        {categoryData &&
          categoryData.map((category, index) => {
            return (
              <Container className="row" key={index}>
                <h3>{category.category}</h3>

                <h3>{category.subCategory}</h3>
                <h3>{`${category.trending}`}</h3>
                <Container className="category-img">
                  <img src={`${category.imgUrl}`} />
                </Container>
                <Container className="btn">
                  <button type="submit" className="update">
                    update
                  </button>
                  <button type="submit">delete</button>
                </Container>
              </Container>
            );
          })}
      </Container>
    </Container>
  );
}
