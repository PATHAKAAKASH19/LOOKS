import React, { useEffect, useState, useRef } from "react";
import InputBox from "../../ui/inputBox/InputBox";
import Container from "../../ui/container/Container";
import Title from "../../ui/title/Title";
import { MdDelete } from "react-icons/md";
import { useSellerAuth } from "../../../context/SellerAuthContext";
import { toast, Toaster } from "react-hot-toast";
import Spinner from "../../ui/spinner/Spinner";


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
  const [change, setChange] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  
  const { sellerToken } = useSellerAuth()
  



  // handle text input box
  const handleInput = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value.toLowerCase()}));
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
      setIsLoading(true)
      if (!update) {
        const formData = new FormData();
        formData.append("category", form.category)
        formData.append("trending", form.trending);
        formData.append("subCategory", form.subCategory);
        formData.append("categoryImg", img);

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category`, {
          method: "POST",
          headers:{
          "Authorization":`Bearer ${sellerToken}`
          },
          body: formData,
        });
        const data = await res.json();

        if (res.status === 201) {
          setChange(data);
          setForm({
            category: "",
            trending: false,
            subCategory: "topwear",
          });
          setPreviewImg("");
          setImg(null);
          setIsLoading(false)
          toast.success(`${data.message}`);
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
          `${import.meta.env.VITE_BACKEND_URL}/api/category/${form._id}`,
          {
            method: "PUT",
            headers:{
              "Authorization":`Bearer ${sellerToken}`
              },
            body: formData,
          }
        );

        const data = await res.json();

        if (res.status === 200) {
          setChange(data);
          setForm({
            category: "",
            trending: false,
            subCategory: "topwear",
          });
          setPreviewImg("");
          setImg(null);
          setUpdate(false);
          toast.success(`${data.message}`);
          setIsLoading(false)
        }
      }
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false)
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
      setIsLoading(true)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${sellerToken}`
        },
        body: JSON.stringify(category),
      });

      const data = await res.json();

      if (res.status === 200) {
     
        setChange(true);
        toast.success(`${data.message}`);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(`${error.message}`);
      setIsLoading(false);
    }
  };

  // fetch category data from backend
  useEffect(() => {
    const getAllCategory = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category/seller`, {
          method:"GET",
          headers:{
            "Authorization":`Bearer ${sellerToken}`
          }
        });
        const data = await res.json();
        
        if (res.status === 200) {
     
          setCategoryData(data.category);
          setChange(false)
          setIsLoading(false);
        }else if (res.status === 404){
          setIsLoading(false)
          setCategoryData(null);
        }
      } catch (error) {
        console.log("error", error);
        setIsLoading(false)
      }
    };

  
    getAllCategory();
  
  }, [change, sellerToken]);

  // update category
  const updateCategory = (category) => {
    setUpdate(true);
    setPreviewImg(category.imgUrl);
    setForm(category);

    window.scrollTo(0, 0);
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

 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);




  return (
    <Container className="admin-panel">
      <Toaster></Toaster>

      {isLoading ? (
        <Spinner width="100%" height="70vh"></Spinner>
      ) : (
        <>
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

              <Container
                className="upload upload1"
                style={{ alignSelf: "center" }}
              >
                <label className="label">
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
                <Container className="btn btn-con">
                  <button
                    type="submit"
                    className="update up"
                    onClick={handleFormSubmit}
                  >
                    update
                  </button>
                  <button
                    type="button"
                    className="delete del"
                    onClick={() => cancleCategoryUpdate()}
                  >
                    cancle
                  </button>
                </Container>
              )}
            </form>
          </Container>

          {categoryData && categoryData.length > 0 && (
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
                    <div className="row" key={index}>
                      
                      
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
                       
                    </div>
                  );
                })}
            </Container>
          )}
        </>
      )}
    </Container>
  );
}
