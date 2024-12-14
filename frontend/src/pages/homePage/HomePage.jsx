import React, { useState, useEffect } from "react";
import { PiPantsLight } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Container from "../../components/ui/container/Container";
import CategorySection from "../../components/categorySection/CategorySection";

export default function HomePage() {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/category/get");
        const imagesData = await response.json();
        setImages(imagesData);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Container className="home">
      {images && images.length > 0 ? (
        <>
          <Container className="BannerSection">
            {images.map((image, index) => {
              if (image.category === "banner" || image.category === "banner2") {
                return (
                  <img key={index} src={image.imgUrl} className="banner" />
                );
              }
            })}
          </Container>

          <CategorySection
            images={images}
            filterType={"trending"}
            title={"SEASONAL TREND"}
            reactIcon={
              <MdSunny style={{ color: "orange", fontSize: "50px" }} />
            }
          />

          <CategorySection
            images={images}
            filterType={"bottomwear"}
            title={"BOTTOM WEAR"}
            reactIcon={
              <PiPantsLight style={{ color: "orange", fontSize: "40px" }} />
            }
          />

          <CategorySection
            images={images}
            filterType={"topwear"}
            title={"TOP WEAR"}
            reactIcon={
              <IoShirtOutline style={{ color: "orange", fontSize: "30px" }} />
            }
          />
        </>
      ) : null}
    </Container>
  );
}
