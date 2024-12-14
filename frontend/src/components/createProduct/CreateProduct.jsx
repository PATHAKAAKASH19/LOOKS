import React, { useEffect, useState } from "react";
import Container from "../ui/container/Container";
import InputBox from "../ui/inputBox/InputBox";
import { MdDelete } from "react-icons/md";

export default function CreateProduct() {
  const [productDetail, setProductDetail] = useState({
    name: "",
    description: "",
    stock: undefined,
    sizes: [],
    price: undefined,
    category: "",
    materialType: "",
    styleType: "",
  });

  const [category, setCategory] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const sizes = ["S", "M", "L", "XL", "XLL"];
  const MAX_IMAGES = 5;

  const handleInput = (e) => {
    setProductDetail((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
  };

  const handleImages = (e) => {
    const files = e.target.files;

    if (productImages.length + files.length > MAX_IMAGES) {
      alert("can only add 5 images");
      return;
    }

    if (previewImages.length + files.length < MAX_IMAGES) {
      alert("add five images for product ");
    }

    setProductImages((prev) => [...prev, ...files]);
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log(urls);
    setPreviewImages((prev) => [...prev, ...urls]);
  };

  const handleImgDelete = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/category/get");
        const categoryData = await res.json();

        if (categoryData) {
          setCategory(categoryData);
        }
      } catch (error) {
        console.log("error : ", error);
      }
    };

    getCategory();
  }, []);

  return (
    <Container>
      <h1>Create Product</h1>
      <form onSubmit={handleFormSubmit}>
        <InputBox
          type="text"
          placeholder="Enter product name"
          name="name"
          value={productDetail.name}
          onChange={handleFormSubmit}
          required
        />

        <textarea
          placeholder="Enter product description"
          name="description"
          value={productDetail.description}
          onChange={handleInput}
          required
        />

        <InputBox
          type="number"
          placeholder="Enter product quantity"
          name="stock"
          value={productDetail.stock}
          onChange={handleInput}
          required
        />

        <InputBox
          type="number"
          placeholder="Enter product price"
          name="price"
          value={productDetail.price}
          onChange={handleInput}
          required
        />

        <InputBox
          type="text"
          placeholder="Enter product material"
          name="materialType"
          value={productDetail.materialType}
          onChange={handleInput}
          required
        />

        <InputBox
          type="text"
          placeholder="Enter product style"
          name="styleType"
          value={productDetail.styleType}
          onChange={handleInput}
          required
        />

        <select
          name="category"
          placeholder="select category"
          onChange={handleInput}
        >
          {category &&
            category.map((ctg, i) =>
              ctg.category === "banner" || ctg.category === "banner2" ? null : (
                <option key={i} value={`${ctg.category}`}>
                  {ctg.category}
                </option>
              )
            )}
        </select>

        <Container></Container>

        <label>
          upload photo
          <InputBox
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImages}
            disabled={previewImages.length >= MAX_IMAGES}
          />
        </label>

        {previewImages &&
          previewImages.map((image, i) => {
            return (
              <Container>
                <img key={i} src={`${image}`} />
                <MdDelete key={i} onClick={() => handleImgDelete(i)} />
              </Container>
            );
          })}

        <button type="submit">submit</button>
      </form>
    </Container>
  );
}

