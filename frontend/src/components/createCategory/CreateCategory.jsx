import React, { useEffect, useState } from "react";
import InputBox from "../ui/inputBox/InputBox";
import Container from "../ui/container/Container";
import Title from "../ui/title/Title";
import { MdDelete } from "react-icons/md";

export default function CreateCategory() {
  // this state stores all form data
  const [form, setForm] = useState({
    category: "",
    trending: false,
    subCategory: "topwear",
  });

  // store preview img

  const [img, setImg] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [categoryData, setCategoryData] = useState(null);
  const [change, setChange] = useState(null);
  const [update, setUpdate] = useState(false);

  // handle text input box
  const handleInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImg = (e) => {
    const file = e.target.files[0];

    setImg(file);

    const url = URL.createObjectURL(file);

    setPreviewImg(url);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!update) {
        console.log("hey")
        const formData = new FormData();
        formData.append("category", form.category);
        formData.append("trending", form.trending);
        formData.append("subCategory", form.subCategory);
        formData.append("categoryImg", img);

        const res = await fetch("http://localhost:3000/api/category/create", {
          method: "POST",
          body: formData,
        });

        const msg = await res.json();

        if (res.status === 201) {
          console.log("hellow workd");
          setChange(msg);
          setForm({
            category: "",
            trending: false,
            subCategory: "topwear",
          });
          setPreviewImg("");
          setImg(null);
        }
      } else {
        const formData = new FormData();
        formData.append("category", form.category);
        formData.append("trending", form.trending);
        formData.append("subCategory", form.subCategory);

        if (img) {
          formData.append("imgUrl", form.imgUrl);
          formData.append("categoryImg", img);
        }
        const res = await fetch(
          `http://localhost:3000/api/category/update/${form._id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        const msg = await res.json();

        if (res.status === 200) {
          setChange(msg);
          setForm({
            category: "",
            trending: false,
            subCategory: "topwear",
          });
          setPreviewImg("");
          setImg(null);
          setUpdate(false);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // delete img from both state
  const handleImgDelete = () => {
    setImg(null);
    setPreviewImg("");
  };

  // delete category data
  const deleteCategory = async (category) => {
    try {
      const res = await fetch("http://localhost:3000/api/category/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const msg = await res.json();

      if (res.status === 200) {
        setChange(msg);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // fetch category data from backend
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
  }, [change]);

  // update category
  const updateCategory = (category) => {
    setUpdate(true);
    setPreviewImg(category.imgUrl);
    setForm(category);
  };

  const cancleCategoryUpdate = () => {
    setForm({
      category: "",
      trending: false,
      subCategory: "topwear",
    });

    setImg(null);
    setPreviewImg(null);
    setUpdate(false);
  };

  return (
    <Container className="admin-panel">
      <Container className="create-category">
        <h1>Create Category</h1>
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
              onChange={handleInput}
              placeholder="enter category name"
            ></InputBox>
          </Container>

          <Container className="input">
            <label htmlFor="trending" style={{ alignSelf: "center" }}>
              trending
            </label>
            <select
              id="trending"
              name="trending"
              onChange={handleInput}
              value={form.trending}
            >
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
              value={form.subCategory}
              onChange={handleInput}
            >
              <option value="topwear">topwear</option>
              <option value="bottomwear">bottomwear</option>
              <option value="accessories">accessories</option>
              <option value="footwear">footwear</option>
              <option value="watches">watches</option>
            </select>
          </Container>

          <Container className="upload upload1" style={{ alignSelf: "center" }}>
            <label>
              upload image
              <InputBox
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImg}
                className="uploadbox"
                key={img ? img.name : "file-input"}
              ></InputBox>
            </label>
          </Container>

          {previewImg ? (
            <Container className="prevImg">
              <img src={previewImg} />
              <MdDelete onClick={handleImgDelete} className="icon" />
            </Container>
          ) : null}

          {!update ? (
            <button type="submit">submit</button>
          ) : (
            <Container className="btn">
              <button
                type="submit"
                className="update"
                onClick={handleFormSubmit}
              >
                update
              </button>
              <button
                type="button"
                className="delete"
                onClick={() => cancleCategoryUpdate()}
              >
                cancle
              </button>
            </Container>
          )}
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
                  <button
                    type="submit"
                    className="update"
                    onClick={() => updateCategory(category)}
                  >
                    update
                  </button>
                  <button
                    type="submit"
                    onClick={() => deleteCategory(category)}
                  >
                    delete
                  </button>
                </Container>
              </Container>
            );
          })}
      </Container>
    </Container>
  );
}
