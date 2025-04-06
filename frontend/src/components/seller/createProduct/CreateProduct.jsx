import React, { useEffect, useState } from "react";
import Container from "../../ui/container/Container";
import InputBox from "../../ui/inputBox/InputBox";
import { MdDelete } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useSellerAuth } from "../../../context/SellerAuthContext";

export default function CreateProduct() {
  const location = useLocation();
  const data = location.state || null;

  const [productDetail, setProductDetail] = useState({
    name: "",
    description: "",
    stock: "",
    price: "",
    materialType: "",
    styleType: "",
    color: "",
    categoryId: "",
    category: "",
  });

  const [size, setSize] = useState([]);
  const [category, setCategory] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate()
  const {sellerToken} = useSellerAuth()

  const sizesArray = ["S", "M", "L", "XL", "XXL"];
  const MAX_IMAGES = 5;

  const handleInput = (e) => {
    if (e.target.name === "category") {
      if (e.target.value) {
        const result = category.find((ele) => e.target.value === ele.category);
        setProductDetail((prev) => ({
          ...prev,
          categoryId: result._id,
          [e.target.name]: e.target.value,
        }));
      } else {
        return;
      }
    } else {
      setProductDetail((prev) => {
        return { ...prev, [e.target.name]: e.target.value.toLowerCase() };
      });
    }
  };

  const handleSizeInput = (e) => {
    if (e.target.checked) {
      setSize((prev) => [...prev, e.target.name]);
    } else {
      setSize((prev) => prev.filter((value, i) => value !== e.target.name));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!update) {
        const formData = new FormData();
        formData.append("name", productDetail.name);
        formData.append("description", productDetail.description);
        formData.append("stock", productDetail.stock);

        formData.append("price", productDetail.price);
        formData.append("categoryId", productDetail.categoryId);
        formData.append("materialType", productDetail.materialType);
        formData.append("styleType", productDetail.styleType);
        formData.append("color", productDetail.color);

        size.forEach((obj, index) => {
          formData.append(`sizes[${index}]`, obj);
        });

        productImages.forEach((file) => {
          formData.append(`productImages`, file);
        });
        const res = await fetch(`/api/product`, {
          method: "POST",
          headers:{
            "Authorization":`Bearer ${sellerToken}`
          },
          body: formData,
        });

        const msg = await res.json();

        if (res.status === 201) {
          setProductDetail({
            name: "",
            description: "",
            stock: "",
            price: "",
            materialType: "",
            styleType: "",
            color: "",
            categoryId: "",
            category: "",
          });
          setPreviewImages([]);
          setProductImages([]);
          setSize([]);

          toast.success(`${msg.message}`);
        }
      } else {
        const formData = new FormData();

        formData.append("name", productDetail.name);
        formData.append("description", productDetail.description);
        formData.append("stock", productDetail.stock);

        formData.append("price", productDetail.price);
        formData.append("categoryId", productDetail.categoryId);
        formData.append("materialType", productDetail.materialType);
        formData.append("styleType", productDetail.styleType);
        formData.append("color", productDetail.color);

        size.forEach((obj, index) => {
          formData.append(`sizes[${index}]`, obj);
        });

        if (productImages) {
          const productImgUrlsArray = productDetail.productImgUrls.filter(
            (img) => previewImages.includes(img)
          );

          productImgUrlsArray.forEach((imgUrl, index) => {
            formData.append(`productImgUrls[${index}]`, imgUrl);
          });

          productImages.forEach((file) => {
            formData.append(`productImages`, file);
          });
        }
        const res = await fetch(
          `/api/product/${productDetail._id}`,
          {
            method: "PUT",
            headers:{
              "Authorization":`Bearer ${sellerToken}`
            },
            body: formData,
          }
        );

        const msg = await res.json();

        if (res.status === 200) {
          setProductDetail({
            name: "",
            description: "",
            stock: "",
            price: "",
            materialType: "",
            styleType: "",
            color: "",
            categoryId: "",
            category: "",
          });
          setPreviewImages([]);
          setProductImages([]);
          setSize([]);
          setUpdate(false);
          toast.success(`${msg.message}`);
        }
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleImages = (e) => {
    const files = e.target.files;
    const arrayFIles = Array.from(files);
    if (productImages.length + files.length > MAX_IMAGES) {
      alert("can only add 5 images");
      return;
    }

    if (previewImages.length + files.length < MAX_IMAGES) {
      alert("add five images for product ");
    }

    setProductImages((prev) => [...prev, ...files]);
    const urls = arrayFIles.map((file) => URL.createObjectURL(file));

    setPreviewImages((prev) => [...prev, ...urls]);
  };

  const handleImgDelete = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  
  // this fetch the categroy data
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch(`/api/category`);
        const {categoryValue} = await res.json();

        if (categoryValue) {
          setCategory(categoryValue);
        }
      } catch (error) {
        console.log("error : ", error);
      }
    };

    getCategory();
  }, []);

  // this add the product details from show Product component to the productDetail state
  useEffect(() => {
 
    // get the product data  from showProduct components and insert to the data into state
     const updateProductDetail = () => {
      const categoryData = category.find(
        (ctgObj) => ctgObj._id === data.categoryId
      );
  
      setProductDetail({ ...data, category: categoryData.category });
  
      setSize(data.sizes);
      setPreviewImages(data.productImgUrls);
      setUpdate(true);
    };
   
    if (data && category.length > 0) {
      updateProductDetail();
    } else {
      return;
    }
  }, [category,data]);

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(
        `/api/product/${productId}`,
        {
          method: "DELETE",
          headers:{
            "Authorization":`Bearer ${sellerToken}`
          }
        }
      );

      const msg = res.json();

      toast.success(`${msg.message}`);
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const goBackToProductPage =  () => {
    navigate("/seller-dashboard/products")
  }



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="admin-panel">
      <Container className="create-category create-product">
        {update ? <h1>Update Product</h1> : <h1>Create Product</h1>}
        <form onSubmit={handleFormSubmit} className="product-form">
          <Container className="box">
            <InputBox
              type="text"
              placeholder="Enter product name"
              name="name"
              value={productDetail.name}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box" id="textarea1">
            <textarea
              placeholder="Enter product description"
              name="description"
              value={productDetail.description}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box">
            <InputBox
              type="number"
              placeholder="Enter product quantity"
              min={10}
              name="stock"
              value={productDetail.stock === "" ? "" :Number(productDetail.stock)}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box">
            <InputBox
              type="number"
              placeholder="Enter product price"
              min={0}
              name="price"
              value={productDetail.price === "" ? "": Number(productDetail.price)}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box">
            <InputBox
              type="text"
              placeholder="Enter product material"
              name="materialType"
              value={productDetail.materialType}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box">
            <InputBox
              type="text"
              placeholder="Enter product style"
              name="styleType"
              value={productDetail.styleType}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box">
            <InputBox
              type="text"
              placeholder="Enter product color"
              name="color"
              value={productDetail.color}
              onChange={handleInput}
              required
            />
          </Container>

          <Container className="box">
            <select
              name="category"
              onChange={handleInput}
              value={productDetail.category}
            >
              <option value="" disabled>
                Select an option
              </option>
              {category &&
                category.map((ctg, i) =>
                  ctg.category === "banner" ||
                  ctg.category === "banner2" ? null : (
                    <option value={`${ctg.category}`} key={i}>
                      {ctg.category}
                    </option>
                  )
                )}
            </select>
          </Container>

          <Container className="sizes-con">
            <label>sizes</label>
            {sizesArray.map((s, i) => (
              <Container className="size1" key={i}>
                <InputBox
                  type="checkbox"
                  id={s}
                  name={s}
                  checked={size.includes(s)}
                  onChange={handleSizeInput}
                  className="checkbox"
                />
                <label htmlFor={s} className="label">
                  {s}
                </label>
              </Container>
            ))}
          </Container>

          <Container className="upload" style={{ alignSelf: "center" }}>
            <label>
              upload product image
              <InputBox
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImages}
                disabled={previewImages.length >= MAX_IMAGES}
                className="uploadbox"
              />
            </label>
          </Container>

          <Container className="product-box">
            {previewImages &&
              previewImages.map((image, i) => {
                return (
                  <Container className="product-img" key={i}>
                    <img key={i} src={`${image}`} />
                    <MdDelete
                      onClick={() => handleImgDelete(i)}
                      className="icon"
                    />
                  </Container>
                );
              })}
          </Container>

          {!update ? (
            <button type="submit">submit</button>
          ) : (
            <Container className="productBtn">
              <button
                type="button"
                className="delete"
                onClick={() => {
                  deleteProduct(data._id);
                }}
              >
                delete
              </button>

              <button
                type="button"
                className="update"
                onClick={handleFormSubmit}
              >
                update
              </button>
              
            
               <button type="button" className="delete" style={{backgroundColor:"black"}} onClick={goBackToProductPage}>
               cancle
               </button>
               
               
              
            
            </Container>
          )}
        </form>
        <Toaster />
      </Container>
    </Container>
  );
}
