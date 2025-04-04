import React, { useState, useEffect } from "react";
import { PiPantsLight } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import Container from "../../components/ui/container/Container";
import CategorySection from "../../components/categorySection/CategorySection";
import Spinner from "../../components/ui/spinner/Spinner";


export default function HomePage() {
  const [images, setImages] = useState(null);

  const [isLoading , setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {

      
      try {

        setIsLoading(true)
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category`);
        const {categoryValue} = await response.json();
       
        setImages(categoryValue);

        setIsLoading(false)
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchImages();
  }, []);

  const CATEGORY_SECTION = [
    {
      filterType: "trending",
      title: "SEASONAL TREND",
      reactIcon: <MdSunny style={{ color: "orange", fontSize: "50px" }} />,
      
    },
    {
      filterType: "bottomwear",
      title: "BOTTOM WEAR",
      reactIcon: <PiPantsLight style={{ color: "orange", fontSize: "40px" }} />,
      
    },

    {
      filterType: "topwear",
      title: "TOP WEAR",
      reactIcon: (
        <IoShirtOutline style={{ color: "orange", fontSize: "30px" }} />
      ),

    },
  ];

  useEffect(() => {
   window.scrollTo(0, 0);
  }, []);

  
  return (
    <Container className="home">
      {isLoading ? (<Spinner></Spinner>):(
        <Container>
          <Container className="BannerSection">
            {images.map((image, index) => {
              if (image.category === "banner" || image.category === "banner2") {
                return (
                  <img key={index} src={image.imgUrl} className="banner" />
                );
              }
            })}
          </Container>

          {CATEGORY_SECTION.map((value, i) => (
          
            <CategorySection
               key={i}
              images={images}
              filterType={value.filterType}
              title={value.title}
              reactIcon={value.reactIcon}
             
            />
          ))}
        </Container>
      ) }
    </Container>
  );
}
